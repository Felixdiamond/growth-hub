import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getCollections } from '@/lib/mongodb';
import { nanoid } from 'nanoid';
import { rateLimit } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);
const BATCH_SIZE = 100; // Resend's daily limit is 100 emails

// Rate limit: 5 requests per minute per IP
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(req: Request) {
  try {
    // Rate limiting
    try {
      await limiter.check(req, 5, 'SUBSCRIBE_RATE_LIMIT');
    } catch {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { email } = await req.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { subscribers } = await getCollections();

    // Check if email already exists
    const existingSubscriber = await subscribers.findOne({ email });
    if (existingSubscriber) {
      if (existingSubscriber.verified) {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 400 }
        );
      } else {
        // Resend verification email
        const verificationToken = existingSubscriber.verificationToken;
        await sendVerificationEmail(email, verificationToken);
        return NextResponse.json(
          { message: 'Verification email resent' },
          { status: 200 }
        );
      }
    }

    // Create new subscriber
    const verificationToken = nanoid();
    await subscribers.insertOne({
      email,
      verificationToken,
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { message: 'Please check your email to verify your subscription' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/verify?token=${token}`;
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Growth Hub <newsletter@shaunpaw.org>',
      to: email,
      subject: '🚀 Verify your Growth Hub subscription',
      html: `
        <div style="font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h1 style="color: #0ea5e9; margin: 0 0 24px 0; font-size: 28px; text-align: center;">
            Welcome to Growth Hub! 🎉
          </h1>

          <p style="color: #1e293b; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
            Thank you for subscribing to our newsletter! Please verify your email address to start receiving updates about new Arduino tutorials and electronics projects.
          </p>

          <div style="margin: 24px 0; text-align: center;">
            <a 
              href="${verificationUrl}"
              style="display: inline-block; background: #0ea5e9; color: white; padding: 14px 28px; text-decoration: none; font-weight: 600;"
            >
              Verify Email Address
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />

          <div style="text-align: center; color: #64748b; font-size: 14px;">
            <p>If you didn't request this subscription, you can safely ignore this email.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }

    console.log('Verification email sent:', data);
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw error;
  }
} 