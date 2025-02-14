import { XMLParser } from 'fast-xml-parser';
import { getCollections } from './mongodb';

interface YouTubeVideo {
  videoId: string;
  title: string;
  link: string;
  description: string;
  thumbnail: string;
  publishedAt: Date;
}

export async function checkNewVideos(channelId: string, isTest: boolean = false): Promise<YouTubeVideo[]> {
  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    console.log('Fetching RSS feed from:', feedUrl);

    // Fetch RSS feed
    const response = await fetch(feedUrl);
    if (!response.ok) {
      console.error('Failed to fetch RSS feed:', response.status, response.statusText);
      const text = await response.text();
      console.error('Response:', text);
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }

    const xml = await response.text();
    console.log('Received XML:', xml.slice(0, 500) + '...'); // Log first 500 chars

    // Parse XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      removeNSPrefix: true // Remove XML namespace prefixes
    });
    const feed = parser.parse(xml);
    console.log('Parsed feed:', JSON.stringify(feed, null, 2));

    // Check if feed has entries
    const entries = feed.feed?.entry || [];
    console.log(`Found ${entries.length} entries in feed`);

    // Get videos collection
    const { videos } = await getCollections();

    // Process each video entry
    const newVideos: YouTubeVideo[] = [];
    for (const entry of entries) {
      try {
        const videoId = entry.videoId;
        console.log('Processing video:', videoId, entry.title);
        
        // In test mode, don't check if video exists
        const existingVideo = isTest ? null : await videos.findOne({ videoId });
        if (!existingVideo) {
          const video: YouTubeVideo = {
            videoId,
            title: entry.title,
            link: entry.link['@_href'],
            description: entry.group?.description || entry.description || '',
            thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
            publishedAt: new Date(entry.published),
          };

          // Store new video in database if not in test mode
          if (!isTest) {
            await videos.insertOne({
              ...video,
              notifiedAt: null,
              createdAt: new Date(),
            });
            console.log('Added new video:', video.title);
          }

          newVideos.push(video);
        } else {
          console.log('Video already exists:', videoId);
        }
      } catch (error) {
        console.error('Error processing video entry:', error, entry);
      }
    }

    return newVideos;
  } catch (error) {
    console.error('Error checking YouTube RSS feed:', error);
    return [];
  }
}

export async function getUnnotifiedVideos(): Promise<YouTubeVideo[]> {
  const { videos } = await getCollections();
  
  const unnotifiedVideos = await videos
    .find({ notifiedAt: null })
    .sort({ publishedAt: 1 })
    .toArray();

  return unnotifiedVideos as YouTubeVideo[];
}

export async function markVideoAsNotified(videoId: string) {
  const { videos } = await getCollections();
  
  await videos.updateOne(
    { videoId },
    {
      $set: {
        notifiedAt: new Date(),
      },
    }
  );
} 