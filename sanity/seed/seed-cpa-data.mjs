import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "jcpj1u8u",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Services
const services = [
  {
    _type: "service",
    title: "Tax Preparation",
    slug: { _type: "slug", current: "tax-preparation" },
    icon: "calculator",
    shortDescription:
      "Individual and business tax returns prepared accurately and on time by experienced CPAs.",
    description:
      "Our tax preparation services cover everything from simple individual returns to complex multi-state business filings. We stay current with the latest tax law changes to maximize your deductions and minimize your liability.\n\nWhether you are filing as an individual, small business owner, or corporation, our team ensures every return is thorough, accurate, and optimized for your situation.",
    features: [
      "Individual tax returns (Form 1040)",
      "Business tax returns (1120, 1120S, 1065)",
      "Multi-state tax filings",
      "Amended returns and back filings",
      "IRS audit representation",
      "Electronic filing with faster refunds",
    ],
    order: 1,
  },
  {
    _type: "service",
    title: "Tax Planning & Strategy",
    slug: { _type: "slug", current: "tax-planning" },
    icon: "trending-up",
    shortDescription:
      "Proactive tax strategies that reduce your liability and keep more money in your pocket year-round.",
    description:
      "Tax planning is not something that should happen only in April. Our year-round approach helps you make informed financial decisions that minimize your tax burden.\n\nWe analyze your current situation, project future scenarios, and develop strategies tailored to your goals, whether that means retirement planning, business expansion, or estate preservation.",
    features: [
      "Year-round tax planning consultations",
      "Estimated tax payment calculations",
      "Retirement contribution optimization",
      "Income timing strategies",
      "Charitable giving planning",
      "Capital gains management",
    ],
    order: 2,
  },
  {
    _type: "service",
    title: "Bookkeeping & Accounting",
    slug: { _type: "slug", current: "bookkeeping" },
    icon: "book-open",
    shortDescription:
      "Accurate, timely bookkeeping so you always know where your business stands financially.",
    description:
      "Clean books are the foundation of every successful business. Our bookkeeping services give you real-time visibility into your financial health, so you can make confident decisions.\n\nFrom daily transaction recording to monthly reconciliations and financial reporting, we handle the details so you can focus on growing your business.",
    features: [
      "Monthly bookkeeping and reconciliation",
      "Accounts payable and receivable management",
      "Financial statement preparation",
      "Cash flow analysis and forecasting",
      "QuickBooks setup and training",
      "Year-end closing and adjustments",
    ],
    order: 3,
  },
  {
    _type: "service",
    title: "Audit & Assurance",
    slug: { _type: "slug", current: "audit-assurance" },
    icon: "shield",
    shortDescription:
      "Independent audit and review services that build confidence with stakeholders and lenders.",
    description:
      "Whether required by lenders, investors, or regulatory bodies, our audit and assurance services provide the independent verification your stakeholders need.\n\nOur experienced audit team follows rigorous standards while maintaining a practical approach that minimizes disruption to your operations.",
    features: [
      "Financial statement audits",
      "Review engagements",
      "Compilation services",
      "Agreed-upon procedures",
      "Internal control assessments",
      "Nonprofit and government audits",
    ],
    order: 4,
  },
  {
    _type: "service",
    title: "Business Advisory",
    slug: { _type: "slug", current: "business-advisory" },
    icon: "briefcase",
    shortDescription:
      "Strategic guidance for business decisions, from startup planning to exit strategies.",
    description:
      "Your CPA should be more than a number cruncher. Our business advisory services provide the strategic insight you need to grow, optimize, and protect your business.\n\nFrom entity selection and formation to succession planning and exit strategies, we serve as your trusted financial advisor through every stage of business.",
    features: [
      "Business formation and entity selection",
      "Financial forecasting and budgeting",
      "Mergers and acquisitions support",
      "Succession and exit planning",
      "Profitability analysis",
      "Strategic business planning",
    ],
    order: 5,
  },
  {
    _type: "service",
    title: "Payroll Services",
    slug: { _type: "slug", current: "payroll-services" },
    icon: "dollar-sign",
    shortDescription:
      "Reliable payroll processing with tax compliance, so your team gets paid correctly and on time.",
    description:
      "Payroll errors cost businesses time, money, and employee trust. Our payroll services ensure accurate, timely processing with full tax compliance.\n\nWe handle everything from weekly payroll runs to quarterly tax filings, W-2 preparation, and compliance reporting, giving you peace of mind that your obligations are met.",
    features: [
      "Weekly, biweekly, or monthly payroll processing",
      "Federal and state payroll tax deposits",
      "Quarterly payroll tax returns (Form 941)",
      "W-2 and 1099 preparation",
      "New hire reporting",
      "Workers compensation reporting",
    ],
    order: 6,
  },
  {
    _type: "service",
    title: "Entity Selection & Structuring",
    slug: { _type: "slug", current: "entity-selection" },
    icon: "building",
    shortDescription:
      "Choose the right business structure to minimize taxes and protect your personal assets.",
    description:
      "The structure of your business affects everything from your tax liability to personal asset protection. We help you choose and maintain the optimal entity type for your situation.\n\nWhether you are starting a new venture or considering restructuring an existing business, our analysis covers tax implications, liability protection, and operational flexibility.",
    features: [
      "LLC vs S-Corp vs C-Corp analysis",
      "Entity formation and registration",
      "Operating agreement review",
      "Tax impact projections",
      "Multi-entity structuring",
      "Annual compliance requirements",
    ],
    order: 7,
  },
];

// Team Members
const teamMembers = [
  {
    _type: "teamMember",
    name: "James Greenleaf",
    slug: { _type: "slug", current: "james-greenleaf" },
    title: "Managing Partner",
    credentials: ["CPA", "MBA"],
    bio: "James founded Greenleaf & Associates over 25 years ago with a vision of providing personalized, high-quality accounting services. With his MBA from UConn and decades of experience serving businesses of all sizes, he leads the firm with a focus on building lasting client relationships and delivering strategic financial guidance.",
    specializations: [
      "Business Advisory",
      "Tax Strategy",
      "Mergers & Acquisitions",
    ],
    email: "james@greenleafcpa.com",
    order: 1,
  },
  {
    _type: "teamMember",
    name: "Patricia Chen",
    slug: { _type: "slug", current: "patricia-chen" },
    title: "Tax Director",
    credentials: ["CPA", "EA"],
    bio: "Patricia brings 18 years of tax expertise to the firm, specializing in complex individual and business tax situations. As an Enrolled Agent, she is authorized to represent clients before the IRS. Her meticulous attention to detail and deep knowledge of tax law make her an invaluable resource for clients navigating challenging tax scenarios.",
    specializations: [
      "Tax Preparation",
      "Tax Planning",
      "IRS Representation",
    ],
    email: "patricia@greenleafcpa.com",
    order: 2,
  },
  {
    _type: "teamMember",
    name: "Michael Torres",
    slug: { _type: "slug", current: "michael-torres" },
    title: "Senior Accountant",
    credentials: ["CPA"],
    bio: "Michael specializes in audit and assurance services, bringing thoroughness and professionalism to every engagement. With experience across industries including manufacturing, real estate, and nonprofit, he provides clients with the confidence that their financial statements meet the highest standards.",
    specializations: [
      "Audit & Assurance",
      "Financial Reporting",
      "Nonprofit Accounting",
    ],
    email: "michael@greenleafcpa.com",
    order: 3,
  },
  {
    _type: "teamMember",
    name: "Sarah Williams",
    slug: { _type: "slug", current: "sarah-williams" },
    title: "Bookkeeping Manager",
    credentials: ["QuickBooks ProAdvisor"],
    bio: "Sarah manages our bookkeeping team and is the go-to expert for clients who need organized, accurate financial records. Her proactive approach to bookkeeping helps businesses catch issues early and maintain the clean financial data needed for informed decision-making.",
    specializations: [
      "Bookkeeping",
      "QuickBooks",
      "Payroll",
    ],
    email: "sarah@greenleafcpa.com",
    order: 4,
  },
];

// Testimonials
const testimonials = [
  {
    _type: "testimonial",
    clientName: "David Martinez",
    clientTitle: "Owner",
    company: "Martinez Auto Group",
    quote:
      "Switching to Greenleaf was the best financial decision we made. They found deductions our previous accountant missed and saved us over $30,000 in our first year. Their team is responsive, thorough, and genuinely invested in our success.",
    rating: 5,
    featured: true,
  },
  {
    _type: "testimonial",
    clientName: "Lisa Thompson",
    clientTitle: "Chef & Owner",
    company: "The Garden Table Restaurant",
    quote:
      "Running a restaurant means I barely have time to think about the books. Sarah and the bookkeeping team keep everything organized month to month, so when tax season comes, we are fully prepared. No stress, no surprises.",
    rating: 5,
    featured: true,
  },
  {
    _type: "testimonial",
    clientName: "Robert Patel",
    clientTitle: "Real Estate Investor",
    company: "Patel Property Holdings",
    quote:
      "James and his team understand the complexities of real estate investing. Their tax planning strategies around depreciation, 1031 exchanges, and entity structuring have been instrumental in growing my portfolio efficiently.",
    rating: 5,
    featured: true,
  },
  {
    _type: "testimonial",
    clientName: "Jennifer Kim",
    clientTitle: "Founder & CEO",
    company: "BrightPath Tech",
    quote:
      "When we were deciding between LLC and S-Corp, Greenleaf walked us through every scenario with clear projections. Two years later, the structure they recommended has saved us significantly in self-employment taxes. Highly recommend their advisory services.",
    rating: 5,
    featured: false,
  },
];

// FAQs
const faqs = [
  {
    _type: "faq",
    question: "What should I bring to my first meeting?",
    answer:
      "For individual clients, please bring your previous year's tax return, W-2s, 1099s, and any relevant financial documents. For business clients, we recommend bringing your most recent financial statements, tax returns, and a list of questions or concerns you would like to discuss. We will send you a detailed checklist before your appointment.",
    category: "getting-started",
    order: 1,
  },
  {
    _type: "faq",
    question: "How much do your services cost?",
    answer:
      "Our fees vary based on the complexity of your situation. Individual tax returns typically start at $250, while business returns start at $750. Monthly bookkeeping packages start at $500 per month. We provide a clear quote before any work begins, so there are no surprises. We also offer bundled packages for clients who need multiple services.",
    category: "pricing",
    order: 2,
  },
  {
    _type: "faq",
    question: "What are the key tax deadlines I should know?",
    answer:
      "The main deadlines are: January 31 for W-2s and 1099s to employees/contractors, March 15 for S-Corp and Partnership returns (Forms 1120S and 1065), April 15 for individual and C-Corp returns, and quarterly estimated tax payments on April 15, June 15, September 15, and January 15. We send reminders well in advance of each deadline.",
    category: "tax",
    order: 3,
  },
  {
    _type: "faq",
    question: "Can you help if I am behind on my taxes?",
    answer:
      "Absolutely. We regularly help clients who have fallen behind on their tax filings. We can prepare back returns, negotiate with the IRS on your behalf, and set up payment plans if needed. The sooner you address the situation, the more options you have, so do not hesitate to reach out.",
    category: "tax",
    order: 4,
  },
  {
    _type: "faq",
    question: "Do you work with businesses outside of Connecticut?",
    answer:
      "Yes. While our office is in Hartford, we serve clients across multiple states. We handle multi-state tax filings and can work with you remotely through secure document sharing and video consultations. Many of our business clients operate in multiple states.",
    category: "general",
    order: 5,
  },
  {
    _type: "faq",
    question: "How often will I hear from my accountant?",
    answer:
      "Communication frequency depends on the services you use. Bookkeeping clients typically have monthly check-ins. Tax clients hear from us quarterly for estimated payments and more frequently during tax season. All clients have direct access to their assigned accountant via phone and email year-round.",
    category: "general",
    order: 6,
  },
  {
    _type: "faq",
    question: "What accounting software do you recommend?",
    answer:
      "For most small to mid-sized businesses, we recommend QuickBooks Online for its ease of use and integration capabilities. For larger businesses, we work with Xero, Sage, and other enterprise platforms. Our team can help you select, set up, and learn the software that best fits your needs.",
    category: "bookkeeping",
    order: 7,
  },
  {
    _type: "faq",
    question: "How do I know if I need an audit vs. a review?",
    answer:
      "An audit provides the highest level of assurance on financial statements and is typically required by lenders, investors, or regulatory bodies. A review provides limited assurance and is less extensive (and less expensive). We can help you determine which level of service is appropriate based on your specific requirements.",
    category: "general",
    order: 8,
  },
];

// Blog Posts
const posts = [
  {
    _type: "post",
    title: "Tax Season 2026: Key Deadlines Every Business Owner Should Know",
    slug: {
      _type: "slug",
      current: "tax-season-2026-key-deadlines-business-owners",
    },
    publishDate: "2026-01-15T09:00:00Z",
    excerpt:
      "Stay ahead of tax season with this comprehensive guide to every important filing deadline in 2026. Missing a deadline can mean penalties, so mark your calendar now.",
    content:
      "Tax season can feel overwhelming, especially when you are managing a business. The key to a stress-free filing season is preparation, and that starts with knowing your deadlines.\n\nHere are the critical dates every business owner needs to know for 2026:\n\nJanuary 31, 2026: This is the deadline for providing W-2 forms to your employees and 1099-NEC forms to independent contractors. If you use contractors, this one is non-negotiable.\n\nMarch 16, 2026: S-Corporations (Form 1120S) and Partnerships (Form 1065) must file their returns by this date. If you need more time, file an extension by this date to avoid penalties.\n\nApril 15, 2026: The big one. Individual tax returns (Form 1040) and C-Corporation returns (Form 1120) are due. This is also the deadline for first-quarter estimated tax payments.\n\nJune 15, 2026: Second-quarter estimated tax payments are due.\n\nSeptember 15, 2026: Third-quarter estimated tax payments are due. This is also the extended deadline for S-Corp and Partnership returns.\n\nOctober 15, 2026: Extended deadline for individual and C-Corp returns.\n\nJanuary 15, 2027: Fourth-quarter estimated tax payments for 2026 are due.\n\nPro tip: Set calendar reminders at least two weeks before each deadline. This gives you and your accountant enough time to gather documents and file accurately. If you are unsure about estimated payments, talk to your CPA now rather than scrambling at deadline time.\n\nNeed help staying on track? Contact our team for a personalized tax calendar based on your specific business situation.",
    categories: ["Tax Tips"],
    tags: ["tax deadlines", "business taxes", "tax season 2026"],
    readTime: 4,
  },
  {
    _type: "post",
    title: "5 Signs Your Business Has Outgrown DIY Bookkeeping",
    slug: {
      _type: "slug",
      current: "signs-business-outgrown-diy-bookkeeping",
    },
    publishDate: "2026-02-01T09:00:00Z",
    excerpt:
      "Managing your own books worked when you started, but growth changes things. Here are five clear signals it is time to bring in a professional bookkeeper.",
    content:
      "When you started your business, handling your own bookkeeping probably made sense. You had a handful of transactions, one bank account, and maybe a simple spreadsheet. But businesses evolve, and what worked at $50K in revenue rarely works at $500K.\n\nHere are five signs it is time to hand off your bookkeeping to a professional:\n\n1. You dread reconciling your accounts. If your bank reconciliation has become a monthly source of anxiety, that is a signal. Clean books should not take more than a few hours each month with the right systems in place. If you are spending entire weekends catching up, the cost of a bookkeeper is probably less than the value of your time.\n\n2. You are not sure if your numbers are right. When a client asks about profitability on a specific project and you cannot answer with confidence, that is a problem. Good bookkeeping gives you real-time visibility into your financial health. Guessing is not a strategy.\n\n3. Tax season is a scramble. If your accountant has to spend hours organizing your records before they can even start your return, you are paying premium rates for basic data entry. Professional bookkeeping throughout the year means a smoother, faster, and cheaper tax preparation process.\n\n4. You have employees. Once you add payroll to the mix, the complexity jumps significantly. Federal and state payroll taxes, quarterly filings, W-2s, benefits tracking, and compliance requirements all require careful attention. Errors here can result in penalties.\n\n5. You are making decisions without financial data. If you are pricing services, hiring staff, or taking on debt without looking at current financial statements, you are flying blind. A professional bookkeeper ensures you always have accurate, up-to-date numbers to inform your decisions.\n\nThe bottom line: professional bookkeeping is not an expense, it is an investment that pays for itself through better decisions, fewer errors, and more of your time focused on what you do best.",
    categories: ["Bookkeeping"],
    tags: ["bookkeeping", "small business", "growth"],
    readTime: 5,
  },
  {
    _type: "post",
    title: "Choosing the Right Business Entity: LLC vs S-Corp vs C-Corp",
    slug: {
      _type: "slug",
      current: "choosing-business-entity-llc-scorp-ccorp",
    },
    publishDate: "2026-02-15T09:00:00Z",
    excerpt:
      "Your business structure affects your taxes, liability, and growth potential. Here is a practical breakdown of the three most common options.",
    content:
      "One of the most important decisions you will make as a business owner is choosing the right entity structure. This choice affects your personal liability, how you pay taxes, your ability to raise capital, and your administrative burden. Let us break down the three most common options.\n\nLLC (Limited Liability Company): An LLC is the most flexible and popular choice for small businesses. It provides personal liability protection, meaning your personal assets are generally shielded from business debts. By default, a single-member LLC is taxed as a sole proprietorship, and a multi-member LLC is taxed as a partnership. The profits pass through to your personal return. Pros include simplicity, flexibility, and liability protection. Cons include self-employment taxes on all profits and less structure for investors.\n\nS-Corporation: An S-Corp is not a separate entity type but rather a tax election. You can elect S-Corp status for either an LLC or a corporation. The key benefit is the ability to split income between salary and distributions. You pay self-employment taxes only on the salary portion, potentially saving thousands per year. However, you must pay yourself a reasonable salary, which the IRS does scrutinize. Pros include tax savings on self-employment taxes and pass-through taxation. Cons include payroll requirements, reasonable salary rules, and more administrative overhead.\n\nC-Corporation: A C-Corp is the standard corporate structure. It is a separate legal entity that pays its own taxes at the corporate rate (currently 21%). Profits distributed to shareholders as dividends are taxed again at the individual level, creating what is known as double taxation. However, C-Corps offer the most flexibility for raising investment capital and can retain earnings at the corporate tax rate. Pros include the ability to raise capital, retain earnings, and offer stock options. Cons include double taxation and more complex compliance.\n\nSo which is right for you? For most small businesses with less than $100K in net profit, an LLC taxed as a sole proprietorship or partnership is the simplest choice. Once your net profit consistently exceeds $60K to $80K, the S-Corp election often makes financial sense due to self-employment tax savings. C-Corps are typically best for businesses seeking outside investment or planning for significant growth.\n\nThe right answer depends on your specific situation, including your income level, growth plans, state of residence, and long-term goals. We recommend discussing your options with a CPA who can model the tax impact of each structure for your particular circumstances.",
    categories: ["Business Advisory"],
    tags: ["entity selection", "LLC", "S-Corp", "C-Corp", "business formation"],
    readTime: 6,
  },
];

async function seed() {
  console.log("Seeding CPA demo data to Sanity...\n");

  // Create services
  console.log("Creating services...");
  for (const service of services) {
    const result = await client.create(service);
    console.log(`  Created: ${service.title} (${result._id})`);
  }

  // Create team members
  console.log("\nCreating team members...");
  for (const member of teamMembers) {
    const result = await client.create(member);
    console.log(`  Created: ${member.name} (${result._id})`);
  }

  // Create testimonials
  console.log("\nCreating testimonials...");
  for (const testimonial of testimonials) {
    const result = await client.create(testimonial);
    console.log(`  Created: ${testimonial.clientName} (${result._id})`);
  }

  // Create FAQs
  console.log("\nCreating FAQs...");
  for (const faq of faqs) {
    const result = await client.create(faq);
    console.log(`  Created: ${faq.question.slice(0, 50)}... (${result._id})`);
  }

  // Create blog posts
  console.log("\nCreating blog posts...");
  for (const post of posts) {
    const result = await client.create(post);
    console.log(`  Created: ${post.title} (${result._id})`);
  }

  console.log("\nDone! All demo content created.");
  console.log(
    "Note: Documents are created as published (no draft prefix)."
  );
}

seed().catch(console.error);
