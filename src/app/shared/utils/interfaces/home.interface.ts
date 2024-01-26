interface BillingCycle {
    cycle_number: number;
    cycle_period: string; // "Month" or "Year"
  }
  
  interface Features {
    id: string;
    name: string;
    description: string;
    confirmation: string;
    initial_payment: number;
    billing_amount: number;
    billing_limit: string;
    trial_amount: number;
    trial_limit: string;
    allow_signups: string;
    expiration_number: string;
    expiration_period: string;
  }
  
  interface Currency {
    name: string;
    decimals: string;
    thousands_separator: string;
    decimal_separator: string;
    symbol: string;
    position: string; // "left"
  }
  
  interface SubscriptionPlan extends BillingCycle, Features {
    // Additional properties can be added as needed
  }
  
  interface Data {
    [key: string]: SubscriptionPlan;
  }
  
  interface ApiResponse {
    success: boolean;
    data: {
      1: SubscriptionPlan;
      2: SubscriptionPlan;
      3: SubscriptionPlan;
      currency: Currency;
    };
  }