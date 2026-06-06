export interface ServiceItem {
  id: "financial-planning" | "mortgage-broking" | "aged-care";
  title: string;
  badge: string;
  shortDescription: string;
  longDescription: string;
  fullContent: string[];
  features: string[];
  pricingModel: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatarUrl: string;
  rating: number;
  service: string;
  quote: string;
  timelineResult: string;
}

export interface TimelineStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  timeframe: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "General" | "Super & Wealth" | "Mortgages" | "Aged Care";
}

export interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  options: {
    text: string;
    score: number;
    tip: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
  suggestedActions?: string[];
}
