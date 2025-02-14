import { config } from 'dotenv';
import { CronJob } from 'cron';
import { XMLParser } from 'fast-xml-parser';
import { MongoClient } from 'mongodb';
import { Resend } from 'resend';
import fetch from 'node-fetch';
import http from 'http';

// Load environment variables
config();

// Initialize services
const resend = new Resend(process.env.RESEND_API_KEY);
const mongoClient = new MongoClient(process.env.MONGODB_URI);
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
});

// Create HTTP server for health checks
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }));
    return;
  }

  res.writeHead(404);
  res.end();
});

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB');
    return mongoClient.db(process.env.MONGODB_DB || 'growth-hub');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// Check for new videos
async function checkNewVideos(channelId, db) {
  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    console.log('Fetching RSS feed from:', feedUrl);

    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }

    const xml = await response.text();
    const feed = parser.parse(xml);
    const entries = feed.feed?.entry || [];
    console.log(`Found ${entries.length} entries in feed`);

    // Get the last check time
    const lastCheck = await db.collection('system').findOne({ key: 'lastVideoCheck' });
    const lastCheckTime = lastCheck?.timestamp || new Date(0);

    // Filter only new videos
    const newVideos = [];
    for (const entry of entries) {
      const publishedAt = new Date(entry.published);
      if (publishedAt > lastCheckTime) {
        newVideos.push({
          videoId: entry.videoId,
          title: entry.title,
          link: entry.link['@_href'],
          description: entry.group?.description || entry.description || '',
          thumbnail: `https://i.ytimg.com/vi/${entry.videoId}/maxresdefault.jpg`,
          publishedAt,
        });
      }
    }

    // Update last check time
    await db.collection('system').updateOne(
      { key: 'lastVideoCheck' },
      { $set: { timestamp: new Date() } },
      { upsert: true }
    );

    return newVideos;
  } catch (error) {
    console.error('Error checking YouTube RSS feed:', error);
    return [];
  }
}

// Send notification emails
async function sendNotifications(video, subscribers, db) {
  console.log(`Sending notifications for video: ${video.title}`);
  const batchSize = 50; // Process in smaller batches
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < subscribers.length; i += batchSize) {
    const batch = subscribers.slice(i, Math.min(i + batchSize, subscribers.length));
    
    await Promise.all(
      batch.map(async (subscriber) => {
        try {
          await resend.emails.send({
            from: 'Growth Hub <onboarding@resend.dev>',
            to: subscriber.email,
            subject: `🎥 New Video: ${video.title}`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; background-color: #f8fafc;">
                  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e2e8f0;">
                    <!-- Header -->
                    <div style="text-align: center; padding: 40px 40px 32px 40px; border-bottom: 1px solid #e2e8f0;">
                      <div style="margin-bottom: 24px;">
                        <span style="display: inline-block; padding: 8px 16px; background-color: #f0f9ff; border-radius: 20px;">
                          <span style="color: #0ea5e9; font-weight: 500; font-size: 14px; letter-spacing: 0.05em;">NEW VIDEO</span>
                        </span>
                      </div>
                      <h1 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">
                        ${video.title}
                      </h1>
                    </div>

                    <!-- Thumbnail -->
                    <div style="position: relative;">
                      <a href="${video.link}" style="display: block; text-decoration: none;">
                        <img 
                          src="${video.thumbnail}" 
                          alt="${video.title}"
                          style="width: 100%; height: auto; display: block; border: none;"
                        />
                      </a>
                    </div>

                    <!-- Content -->
                    <div style="padding: 32px 40px 40px 40px;">
                      <!-- CTA Button -->
                      <div style="margin-bottom: 32px; text-align: center;">
                        <a 
                          href="${video.link}"
                          style="display: inline-block; background: #0ea5e9; color: white; padding: 16px 36px; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 4px;"
                        >
                          Watch on YouTube
                        </a>
                      </div>

                      <!-- Divider -->
                      <div style="margin: 0 auto; width: 40px; height: 4px; background: #f1f5f9; border-radius: 2px;"></div>

                      <!-- Footer -->
                      <div style="margin-top: 32px; text-align: center; color: #64748b; font-size: 14px;">
                        <p style="margin: 0 0 8px 0;">
                          You're receiving this because you subscribed to Growth Hub updates.
                        </p>
                        <p style="margin: 0;">
                          <a 
                            href="${process.env.SITE_URL}/api/newsletter/unsubscribe?email=${subscriber.email}"
                            style="color: #0ea5e9; text-decoration: none; border-bottom: 1px solid #0ea5e9; padding-bottom: 1px;"
                          >
                            Unsubscribe
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </body>
              </html>
            `,
          });
          successCount++;
        } catch (error) {
          console.error('Error sending email:', error);
          errorCount++;
        }
      })
    );

    // Add a small delay between batches
    if (i + batchSize < subscribers.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Mark video as notified
  await db.collection('videos').updateOne(
    { videoId: video.videoId },
    {
      $set: {
        notifiedAt: new Date(),
      },
    },
    { upsert: true }
  );

  return { successCount, errorCount };
}

// Main process function
async function processNewVideos(db) {
  try {
    console.log('Starting video check process...');

    // Get new videos
    const videos = await checkNewVideos(process.env.YOUTUBE_CHANNEL_ID, db);
    if (videos.length === 0) {
      console.log('No new videos found');
      return;
    }

    // Get verified subscribers
    const subscribers = await db.collection('subscribers')
      .find({ verified: true })
      .toArray();

    if (subscribers.length === 0) {
      console.log('No verified subscribers to notify');
      return;
    }

    // Process each video
    for (const video of videos) {
      // Check if already notified
      const existingVideo = await db.collection('videos').findOne({ videoId: video.videoId });
      if (existingVideo?.notifiedAt) {
        console.log(`Already notified about video: ${video.title}`);
        continue;
      }

      // Send notifications
      console.log(`Processing video: ${video.title}`);
      const { successCount, errorCount } = await sendNotifications(video, subscribers, db);
      console.log(`Notifications sent - Success: ${successCount}, Errors: ${errorCount}`);
    }
  } catch (error) {
    console.error('Error in process:', error);
  }
}

// Start the service
async function startService() {
  const db = await connectDB();

  // Run every day at 12:00 UTC
  const job = new CronJob(
    '0 12 * * *',
    () => processNewVideos(db),
    null,
    true,
    'UTC'
  );

  // Start HTTP server
  const PORT = process.env.PORT || 10000;
  server.listen(PORT, () => {
    console.log(`Health check server listening on port ${PORT}`);
  });

  console.log('Service started. Next run:', job.nextDate().toString());
}

startService().catch(console.error); 