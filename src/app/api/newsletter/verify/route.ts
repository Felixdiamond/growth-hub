import { NextResponse } from 'next/server';
import { getCollections } from '@/lib/mongodb';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    const { subscribers } = await getCollections();

    // Find subscriber by verification token
    const subscriber = await subscribers.findOne({ verificationToken: token });
    if (!subscriber) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    if (subscriber.verified) {
      return NextResponse.json(
        { message: 'Email already verified' },
        { status: 200 }
      );
    }

    // Update subscriber to verified status
    await subscribers.updateOne(
      { verificationToken: token },
      {
        $set: {
          verified: true,
          updatedAt: new Date(),
        },
      }
    );

    // Redirect to success page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/success`
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email. Please try again later.' },
      { status: 500 }
    );
  }
} 