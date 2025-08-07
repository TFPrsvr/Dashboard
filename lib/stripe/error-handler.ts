export interface StripeErrorInfo {
  userMessage: string;
  shouldRetry: boolean;
  shouldContactSupport: boolean;
}

export function handleStripeError(error: any): StripeErrorInfo {
  // If Stripe is not properly configured
  if (error.type === 'StripeInvalidRequestError') {
    if (error.code === 'api_key_invalid') {
      return {
        userMessage: "Payment system configuration error. Please contact support.",
        shouldRetry: false,
        shouldContactSupport: true
      };
    }
  }

  // If card is declined
  if (error.type === 'StripeCardError') {
    return {
      userMessage: error.message || "Your card was declined. Please try a different payment method.",
      shouldRetry: true,
      shouldContactSupport: false
    };
  }

  // If network connectivity issues
  if (error.type === 'StripeConnectionError') {
    return {
      userMessage: "Network error. Please check your internet connection and try again.",
      shouldRetry: true,
      shouldContactSupport: false
    };
  }

  // If webhook secret is invalid
  if (error.message?.includes('webhook') || error.message?.includes('signature')) {
    return {
      userMessage: "Payment verification failed. Please contact support.",
      shouldRetry: false,
      shouldContactSupport: true
    };
  }

  // If unknown error
  return {
    userMessage: "An unexpected error occurred. Please try again or contact support.",
    shouldRetry: true,
    shouldContactSupport: true
  };
}