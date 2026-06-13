export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  popular: boolean;
  features: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  tech: string[];
  mockupUrl: string;
  gradient: string;
  metrics: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
  stars: number;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  webzStudio: string | boolean;
  others: string | boolean;
}

export interface BriefProposal {
  projectVision: string;
  recommendedStack: string[];
  featureHighlights: Array<{
    title: string;
    description: string;
  }>;
  investmentBreakdown: {
    estimatedCost: string;
    deliveryTimeline: string;
    pricingJustification: string;
  };
  milestones: Array<{
    phase: string;
    timeline: string;
  }>;
  conversionAdvice: string;
}
