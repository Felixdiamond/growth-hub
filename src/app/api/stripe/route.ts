import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing Stripe secret key');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(req: Request) {
  try {
    const { amount, interval, currency = 'usd' } = await req.json();

    // Create or retrieve the price based on amount and interval
    const price = await getOrCreatePrice(amount, interval, currency);

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: interval === 'one-time' ? 'payment' : 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}

async function getOrCreatePrice(amount: number, interval: string, currency: string) {
  const amountInCents = Math.round(amount * 100);
  const intervalMap = {
    monthly: 'month',
    yearly: 'year',
    'one-time': null,
  } as const;

  // Search for existing price
  const prices = await stripe.prices.list({
    limit: 100,
    currency,
  });

  const existingPrice = prices.data.find(
    (price) => 
      price.unit_amount === amountInCents &&
      (interval === 'one-time' 
        ? !price.recurring
        : price.recurring?.interval === intervalMap[interval as keyof typeof intervalMap])
  );

  if (existingPrice) {
    return existingPrice;
  }

  // Create new price if none exists
  return stripe.prices.create({
    currency,
    unit_amount: amountInCents,
    product_data: {
      name: `${currency.toUpperCase()} ${amount} ${interval} Donation`,
    },
    ...(interval !== 'one-time' && {
      recurring: {
        interval: intervalMap[interval as keyof typeof intervalMap] as Stripe.Price.Recurring.Interval,
      },
    }),
  });
} 