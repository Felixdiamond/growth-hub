import { NextResponse } from 'next/server';
import { checkNewVideos, getUnnotifiedVideos, markVideoAsNotified } from '@/lib/youtube-rss';
import { getCollections } from '@/lib/mongodb';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const BATCH_SIZE = 100; // Resend's daily limit is 100 emails
const DEFAULT_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UC_mYaQAE6-71rjSN6CeCA-g';

// Vercel Cron Job - runs every hour
export const maxDuration = 300; // 5 minutes maximum execution time
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get('Authorization');
    if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Allow channel ID override for testing
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get('channelId') || DEFAULT_CHANNEL_ID;
    const isTest = searchParams.get('test') === 'true';

    // Check for new videos
    const newVideos = await checkNewVideos(channelId, isTest);
    console.log(`Found ${newVideos.length} new videos for channel ${channelId}`);

    // For testing, we'll use the latest video even if it's been notified
    const videosToProcess = isTest 
      ? newVideos.length > 0 ? [newVideos[0]] : []  // Always use latest video in test mode
      : await getUnnotifiedVideos();

    if (videosToProcess.length === 0) {
      return NextResponse.json({ 
        message: 'No videos found in feed',
        channelId,
        isTest,
      });
    }

    // Get verified subscribers
    const { subscribers } = await getCollections();
    const verifiedSubscribers = await subscribers
      .find({ verified: true })
      .toArray();

    if (verifiedSubscribers.length === 0) {
      return NextResponse.json({ 
        message: 'No verified subscribers to notify',
        channelId,
        isTest,
      });
    }

    // Send notifications in batches
    let successCount = 0;
    let errorCount = 0;

    // Process each video
    for (const video of videosToProcess) {
      // Process subscribers in batches
      for (let i = 0; i < verifiedSubscribers.length; i += BATCH_SIZE) {
        const batch = verifiedSubscribers.slice(i, i + BATCH_SIZE);
        
        try {
          // Send emails
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
                              <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%);"></div>
                            </a>
                          </div>

                          <!-- Content -->
                          <div style="padding: 32px 40px 40px 40px;">
                            <!-- CTA Button -->
                            <div style="margin-bottom: 32px; text-align: center;">
                              <a 
                                href="${video.link}"
                                style="display: inline-block; background: #0ea5e9; color: white; padding: 16px 36px; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 4px; transition: background-color 0.2s ease;"
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
                                  href="${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/unsubscribe?email=${subscriber.email}"
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

          if (!isTest) {
            // Only mark as notified if not in test mode
            await markVideoAsNotified(video.videoId);
          }
        } catch (error) {
          console.error('Batch processing error:', error);
        }
      }
    }

    return NextResponse.json({
      message: 'Notification process completed',
      stats: {
        channelId,
        isTest,
        newVideos: newVideos.length,
        processedVideos: videosToProcess.length,
        subscribers: verifiedSubscribers.length,
        successfulEmails: successCount,
        failedEmails: errorCount,
      },
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'Failed to process notifications' },
      { status: 500 }
    );
  }
}