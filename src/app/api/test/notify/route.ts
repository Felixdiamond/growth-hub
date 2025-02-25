import { NextResponse } from 'next/server';
import { checkNewVideos } from '@/lib/youtube-rss';
import { getCollections } from '@/lib/mongodb';
import { Resend } from 'resend';

// This is just a test endpoint, so we'll add basic auth
const ADMIN_SECRET = process.env.CRON_SECRET || 'ayane';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  // Check for admin secret
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized access' },
      { status: 401 }
    );
  }

  try {
    // Get the channel ID from environment or default
    const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UCCfcIlbHoKi_wW17Cvsx6sg';
    
    // Call checkNewVideos with isTest = true to bypass existing video check
    const videos = await checkNewVideos(channelId, true);
    
    if (videos.length === 0) {
      return NextResponse.json(
        { error: 'No videos found in feed' },
        { status: 404 }
      );
    }

    // Get the first video for testing
    const testVideo = videos[0];
    
    // Get verified subscribers
    const { subscribers } = await getCollections();
    const verifiedSubscribers = await subscribers
      .find({ verified: true })
      .limit(1) // Just get one subscriber for testing
      .toArray();
    
    if (verifiedSubscribers.length === 0) {
      return NextResponse.json(
        { error: 'No verified subscribers found' },
        { status: 404 }
      );
    }
    
    // Send test email
    const subscriber = verifiedSubscribers[0];
    
    const { data, error } = await resend.emails.send({
      from: 'Growth Hub <newsletter@shaunpaw.org>',
      to: subscriber.email,
      subject: `🎥 [TEST] New Video: ${testVideo.title}`,
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
                    <span style="color: #0ea5e9; font-weight: 500; font-size: 14px; letter-spacing: 0.05em;">TEST NOTIFICATION</span>
                  </span>
                </div>
                <h1 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">
                  ${testVideo.title}
                </h1>
              </div>

              <!-- Thumbnail -->
              <div style="position: relative;">
                <a href="${testVideo.link}" style="display: block; text-decoration: none;">
                  <img 
                    src="${testVideo.thumbnail}" 
                    alt="${testVideo.title}"
                    style="width: 100%; height: auto; display: block; border: none;"
                  />
                </a>
              </div>

              <!-- Content -->
              <div style="padding: 32px 40px 40px 40px;">
                <!-- Notice -->
                <div style="margin-bottom: 24px; padding: 12px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #0ea5e9;">
                  <p style="margin: 0; color: #0f172a;">
                    This is a <strong>TEST</strong> notification. No action is required.
                  </p>
                </div>

                <!-- CTA Button -->
                <div style="margin-bottom: 32px; text-align: center;">
                  <a 
                    href="${testVideo.link}"
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
                    You're receiving this test email because you subscribed to Growth Hub updates.
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

    if (error) {
      console.error('Error sending test email:', error);
      return NextResponse.json(
        { error: `Failed to send test email: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Test notification sent successfully',
      video: testVideo,
      emailId: data?.id,
      recipient: subscriber.email
    });
  } catch (error) {
    console.error('Test notification error:', error);
    return NextResponse.json(
      { error: `Test notification failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
} 