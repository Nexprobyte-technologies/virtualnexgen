export interface ServiceSection {
  heading: string;
  text: string;
  image: string;
}

export interface ServiceBenefit {
  icon: string;
  title: string;
  desc: string;
}

export interface ServiceStep {
  num: string;
  title: string;
  desc: string;
}

export interface ServicePricing {
  label: string;
  price: string;
  desc: string;
  highlighted?: boolean;
}

export interface ServiceTestimonial {
  quote: string;
  name: string;
  role: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  image: string;
  short: string;
  content: string[];
  sections: ServiceSection[];
  createdAt: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaButton?: string;
  ctaPhone?: string;
  ctaPoints?: string[];
  benefits?: ServiceBenefit[];
  steps?: ServiceStep[];
  pricing?: ServicePricing[];
  testimonials?: ServiceTestimonial[];
  faqs?: ServiceFaq[];
  fullContent?: {
    contentHtml?: string;
    contentText?: string;
    headings?: string[];
    tasks?: Array<{ title: string; description: string; number: number }>;
    images?: string[];
    metaDescription?: string;
    intro?: string;
    url?: string;
    title?: string;
    image?: string;
  };
}

export interface ChatbotEntry {
  id: string;
  question: string;
  answer: string;
  audio: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  link: string;
  author: string;
  date: string;
  tags: string[];
  createdAt: string;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  date: string;
  time: string;
  message: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  /** Public Calendly invitee/booking URL for meetings booked via the embedded widget. */
  meetingUrl?: string;
  /** Where the booking came from: internal booking flow or Calendly embed. */
  source?: "internal" | "calendly";
}

export interface AboutSection {
  id: string;
  title: string;
  eyebrow?: string;
  icon?: string;
  content: string;
  image: string;
}

export interface AboutFeature {
  id: string;
  icon: string;
  title: string;
  text: string;
  image: string;
}

export interface AboutPage {
  heroTitle: string;
  heroDescription: string;
  sections: AboutSection[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  tag?: string;
  tags?: string;
  excerpt: string;
  content: string;
  image: string;
  industry?: string;
  date?: string;
  results?: string;
  clientOverview?: string;
  challenge?: string;
  solution?: string;
  createdAt: string;
}
