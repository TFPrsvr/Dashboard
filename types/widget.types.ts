export interface WidgetTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: string;
  customCss?: string;
  headerText: string;
  headerColor: string;
  headerAlignment: "left" | "center" | "right";
  buttonTextColor: string;
  backgroundColor: string;
}

export interface WidgetConfig {
  theme: WidgetTheme;
  causes: Cause[];
  settings: {
    showProgressBar: boolean;
    showDonorList: boolean;
    allowRecurring: boolean;
    minimumDonation: number;
    suggestedAmounts: number[];
    showCoverFees: boolean;
    defaultFrequency: "one-time" | "monthly";
  };
}

export interface Cause {
  id: string;
  widget_id: string;
  name: string;
  description?: string;
  goal_amount?: number;
  raised_amount: number;
  is_active: boolean;
  created_at: string;
}

export interface Widget {
  id: string;
  organization_id: string;
  name: string;
  slug: string;
  config: WidgetConfig;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
