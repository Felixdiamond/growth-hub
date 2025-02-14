import { useState } from 'react';
import { getStripe } from '@/lib/stripe-client';

interface UseStripePaymentProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useStripePayment({ onSuccess, onError }: UseStripePaymentProps = {}) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (amount: string, interval: 'one-time' | 'monthly' | 'yearly') => {
    try {
      setIsLoading(true);

      // Create Checkout Session
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          interval,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Redirect to Checkout
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw stripeError;
      }

      onSuccess?.();
    } catch (error) {
      console.error('Payment error:', error);
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handlePayment,
    isLoading,
  };
} 