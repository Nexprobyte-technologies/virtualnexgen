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
}

export interface AboutSection {
  id: string;
  title: string;
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
  excerpt: string;
  content: string;
  image: string;
  industry: string;
  date: string;
  results: string;
  createdAt: string;
}

export interface ContactPage {
  address: string;
  phone: string;
  email: string;
  hours: string;
}