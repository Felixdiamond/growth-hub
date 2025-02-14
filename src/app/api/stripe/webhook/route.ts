import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCollections } from '@/lib/mongodb';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing Stripe secret key');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
});

// This is necessary to disable the automatic body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

async function handlePaymentSucceeded(session: Stripe.Checkout.Session) {
  try {
    const { subscribers } = await getCollections();
    const customerEmail = session.customer_details?.email;
    
    if (customerEmail) {
      // Update donor status in subscribers collection if they exist
      await subscribers.updateOne(
        { email: customerEmail },
        {
          $set: {
            isDonor: true,
            lastDonation: {
              amount: session.amount_total ? session.amount_total / 100 : 0,
              currency: session.currency,
              date: new Date(),
            },
          },
          $inc: {
            totalDonations: session.amount_total ? session.amount_total / 100 : 0,
          },
        },
        { upsert: false }
      );
    }

    // Store donation record
    const { donations } = await getCollections();
    await donations.insertOne({
      sessionId: session.id,
      customerId: session.customer,
      customerEmail,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
      status: 'succeeded',
      type: session.mode === 'subscription' ? 'recurring' : 'one-time',
      metadata: session.metadata,
      createdAt: new Date(),
    });

    console.log(`Payment recorded for session ${session.id}`);
  } catch (error) {
    console.error('Error handling payment success:', error);
    throw error;
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const { subscriptions } = await getCollections();
    
    await subscriptions.updateOne(
      { subscriptionId: subscription.id },
      {
        $set: {
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    console.log(`Subscription ${subscription.id} updated: ${subscription.status}`);
  } catch (error) {
    console.error('Error handling subscription update:', error);
    throw error;
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const { subscriptions, subscribers } = await getCollections();
    
    // Update subscription record
    await subscriptions.updateOne(
      { subscriptionId: subscription.id },
      {
        $set: {
          status: 'canceled',
          canceledAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    // Update subscriber record if customer email exists
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    if ('email' in customer && customer.email) {
      await subscribers.updateOne(
        { email: customer.email },
        {
          $set: {
            hasActiveSubscription: false,
            subscriptionCanceledAt: new Date(),
          },
        }
      );
    }

    console.log(`Subscription ${subscription.id} canceled`);
  } catch (error) {
    console.error('Error handling subscription deletion:', error);
    throw error;
  }
}

async function handleChargeSucceeded(charge: Stripe.Charge) {
  try {
    const { charges } = await getCollections();
    
    await charges.insertOne({
      chargeId: charge.id,
      amount: charge.amount / 100,
      currency: charge.currency,
      customerId: charge.customer,
      paymentIntentId: charge.payment_intent,
      status: charge.status,
      metadata: charge.metadata,
      createdAt: new Date(charge.created * 1000),
    });

    console.log(`Charge ${charge.id} recorded`);
  } catch (error) {
    console.error('Error handling charge success:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing stripe signature or webhook secret' },
      { status: 400 }
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log(`Processing Stripe event: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await handlePaymentSucceeded(session);
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(updatedSubscription);
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(deletedSubscription);
        break;

      case 'charge.succeeded':
        const charge = event.data.object as Stripe.Charge;
        await handleChargeSucceeded(charge);
        break;

      case 'payment_intent.created':
      case 'payment_intent.succeeded':
      case 'charge.updated':
        // These events are informational and don't require special handling
        console.log(`Received informational event: ${event.type}`);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
} 