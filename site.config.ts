export const siteConfig = {
  // Business Info
  name: "Greenleaf & Associates CPA",
  tagline: "Your Trusted Financial Partner",
  description:
    "Full-service accounting firm providing tax preparation, bookkeeping, audit, and business advisory services to individuals and businesses.",
  phone: "(555) 234-5678",
  email: "info@greenleafcpa.com",
  address: {
    street: "456 Oak Street, Suite 200",
    city: "Hartford",
    state: "CT",
    zip: "06103",
  },
  logo: "/logo.svg",

  // Color Palette
  colors: {
    primary: "#1B4D3E",
    primaryLight: "#2D7A5F",
    secondary: "#C9A84C",
    background: "#FAFAF8",
    surface: "#FFFFFF",
    text: "#1A1A1A",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    accent: "#C9A84C",
  },

  // Fonts
  fonts: {
    heading: "Playfair Display",
    body: "Inter",
  },

  // Feature Toggles
  features: {
    blog: true,
    testimonials: true,
    teamPage: true,
    faq: true,
    newsletter: true,
    clientPortal: false,
    onlineBooking: false,
    serviceAreas: true,
  },

  // Social Links
  social: {
    facebook: "https://facebook.com/greenleafcpa",
    linkedin: "https://linkedin.com/company/greenleafcpa",
    twitter: "https://twitter.com/greenleafcpa",
    instagram: "",
    youtube: "",
  },

  // SEO Defaults
  seo: {
    titleTemplate: "%s | Greenleaf & Associates CPA",
    defaultTitle: "Greenleaf & Associates CPA | Your Trusted Financial Partner",
    defaultDescription:
      "Full-service CPA firm in Hartford, CT. Tax preparation, bookkeeping, audit, and business advisory services for individuals and businesses.",
    siteUrl: "https://greenleafcpa.com",
    ogImage: "/og-image.jpg",
  },

  // Sanity CMS
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jcpj1u8u",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
  },

  // Navigation
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],

  // Business Hours
  hours: [
    { day: "Monday - Friday", time: "8:00 AM - 6:00 PM" },
    { day: "Saturday", time: "9:00 AM - 1:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],

  // Stats (for homepage stats bar)
  stats: [
    { value: "25+", label: "Years of Experience" },
    { value: "500+", label: "Clients Served" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "$50M+", label: "Tax Savings Delivered" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
