import type {
  ServiceBenefit,
  ServicePricing,
  ServiceStep,
  ServiceTestimonial,
  ServiceTrustBadge,
  ServiceLogo,
  ServiceProblemCard,
} from "./types";

export const trustBadges: ServiceTrustBadge[] = [
  { icon: "Award", label: "Industry Expertise" },
  { icon: "Users", label: "Dedicated VAs" },
  { icon: "Clock", label: "Fast Onboarding" },
  { icon: "Shield", label: "Secure & Compliant" },
  { icon: "TrendingUp", label: "Up to 60% Cost Savings" },
  { icon: "Zap", label: "Workflow Ready" },
];

export const defaultTrustBadges = trustBadges;

export const problemPoints = [
  "Workflow backlogs impacting delivery",
  "High local staffing overhead",
  "Burnout from repetitive admin work",
];

export const problemCards: ServiceProblemCard[] = [
  { title: "Workflow Bottlenecks", desc: "Tasks pile up when processes start too late." },
  { title: "Slow Turnaround", desc: "Delayed responses create client friction." },
  { title: "Data Gaps", desc: "Incomplete updates lead to reporting issues." },
  { title: "Rising Overhead", desc: "Local staffing costs keep increasing." },
];

export const defaultBenefits: ServiceBenefit[] = [
  {
    icon: "Zap",
    title: "Ready from Day One",
    desc: "Trained on your industry workflows, tools, and communication standards.",
  },
  {
    icon: "Shield",
    title: "Expert Specialists",
    desc: "Proficient in your specific platforms and management systems.",
  },
  {
    icon: "TrendingUp",
    title: "Built to Scale",
    desc: "Add operational capacity without increasing internal overhead.",
  },
  {
    icon: "Users",
    title: "Dedicated Resources",
    desc: "Consistent team that learns your business inside out.",
  },
  {
    icon: "Clock",
    title: "Fast Turnaround",
    desc: "Quick response times that keep your operations moving.",
  },
  {
    icon: "Award",
    title: "Quality Focused",
    desc: "Accuracy-driven support with clear process execution.",
  },
];

export const defaultSteps: ServiceStep[] = [
  {
    num: "01",
    title: "Operations Review",
    desc: "We assess your workflows, tools setup, and operational gaps.",
  },
  {
    num: "02",
    title: "VA Matching",
    desc: "Matched with a trained VA aligned to your workflows and systems.",
  },
  {
    num: "03",
    title: "Systems Integration",
    desc: "Access, SOPs, and workflows configured for seamless handoff.",
  },
  {
    num: "04",
    title: "Scale Operations",
    desc: "Your VA handles daily tasks so your team focuses on growth.",
  },
];

export const defaultPricing: ServicePricing[] = [
  {
    label: "Local In-House Staff",
    price: "$55,000+",
    desc: "Salary + Taxes + Benefits + Training",
    highlighted: false,
  },
  {
    label: "Our Specialist",
    price: "$19,500",
    desc: "Flat Monthly Rate • Enterprise Infrastructure",
    highlighted: true,
  },
  {
    label: "Annual Savings",
    price: "$35,000+",
    desc: "Reclaimed capital for growth",
    highlighted: false,
  },
];

export const defaultTestimonials: ServiceTestimonial[] = [
  {
    quote:
      "They've taken a lot of routine work off our team's plate, which gives us more time to focus on clients and growth.",
    name: "Dan F.",
    role: "Director of Sales",
  },
  {
    quote:
      "We started with a few basic tasks and, over time, became comfortable giving the team more. It's worked out really well.",
    name: "Michael S.",
    role: "Agency Owner",
  },
  {
    quote:
      "They took the time to learn how we work, which means a lot less back-and-forth for our team.",
    name: "Charis P.",
    role: "President",
  },
  {
    quote:
      "They've become a real support for our account managers. They handle a lot of the work our team doesn't need to spend time on.",
    name: "Eric K.",
    role: "President",
  },
];

export const clientLogos: ServiceLogo[] = [
  {
    name: "AMS 360",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScE-KEH4zYxTUZ9fdHTrxqw1c9jLVcUUNuRm2os1ZOmjxHuinzGUCpRkLb&s=10",
  },
  {
    name: "Applied Systems",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT47PkrE_Fn2nOg4O0Hpmi0I6O5Oh-xkkNb-02XkNgzahB9RSiZ6WdAHA&s=10",
  },
  {
    name: "HawkSoft",
    src: "https://catalyit.com/hubfs/Solution%20Provider%20Logos/HawkSoft%20logo%20color%20with%20AMS%20tagline.png",
  },
  {
    name: "EzLynx",
    src: "https://ml.globenewswire.com/Resource/Download/2e03c5ba-c7ea-4705-8c4d-3d5c30a1d8a1?size=3",
  },
];

export const folderHints = [
  "Tap the folder to open",
  "Drag a chapter to toss it",
  "Click a chapter to jump",
];

export const relatedTitle = "Related Services";