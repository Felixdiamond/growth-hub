import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
export const getStripe = async () => {
  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  
  if (!stripePublicKey) {
    throw new Error('Missing Stripe publishable key');
  }

  const stripePromise = loadStripe(stripePublicKey);
  return stripePromise;
}; 