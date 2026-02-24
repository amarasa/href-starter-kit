# Href Starter Kit + CPA Template Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a reusable Next.js + Sanity starter kit with a theming system driven by `site.config.ts`, then apply the CPA/Accounting template as the first industry implementation.

**Architecture:** Next.js 15 App Router + Sanity CMS (embedded Studio) + Tailwind CSS 4 with CSS variable theming. All branding/config lives in `site.config.ts`. Sanity schemas are shared across all templates. Industry-specific content is in Sanity, not in code.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Sanity v3, next-sanity, Lucide icons

**Repo:** `/Users/angelom/apps/href-starter-kit/` (github.com/amarasa/href-starter-kit)

**CPA Color Palette:**
- Primary: Deep Forest Green (#1B4D3E)
- Primary Light: (#2D7A5F)
- Secondary/Accent: Warm Gold (#C9A84C)
- Background: Warm White (#FAFAF8)
- Surface: White (#FFFFFF)
- Text: Near Black (#1A1A1A)
- Text Muted: (#6B7280)
- Border: (#E5E7EB)

**Fonts:** Playfair Display (headings) + Inter (body)

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `site.config.ts`
- Create: `.gitignore`, `.env.local.example`

**Step 1: Initialize Next.js project**

```bash
cd /Users/angelom/apps/href-starter-kit
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --yes
```

Note: Since repo already has README.md, may need to force or handle existing files.

**Step 2: Install dependencies**

```bash
npm install next-sanity sanity @sanity/image-url @sanity/vision lucide-react
npm install -D @tailwindcss/typography
```

**Step 3: Create site.config.ts**

This is the central configuration file. Create at project root with the full CPA template config including: name, tagline, description, phone, email, address, logo path, colors object (primary, primaryLight, secondary, background, surface, text, textMuted, border, accent), fonts (heading, body), features toggles (blog, testimonials, teamPage, faq, newsletter, clientPortal, onlineBooking, serviceAreas), social links, SEO defaults, Sanity config, and navigation items array.

CPA defaults:
- name: "Greenleaf & Associates CPA"
- tagline: "Your Trusted Financial Partner"
- colors: Forest Green + Gold palette as specified above
- fonts: Playfair Display + Inter
- All features enabled except clientPortal and onlineBooking

**Step 4: Configure Tailwind to read from site.config.ts**

Update `tailwind.config.ts` to extend theme colors using CSS variables that will be set in globals.css from the config. This allows runtime theming without rebuilding Tailwind.

**Step 5: Set up globals.css with CSS variables**

Define CSS custom properties (`--color-primary`, `--color-secondary`, etc.) and map them in Tailwind config. Import Google Fonts for Playfair Display and Inter.

**Step 6: Create root layout.tsx**

Import fonts, set CSS variables from siteConfig, apply base styling. Include metadata generation from siteConfig.

**Step 7: Create minimal homepage**

Just a "Hello from [siteConfig.name]" to verify everything works.

**Step 8: Verify and commit**

```bash
npm run dev  # verify it runs
npm run build  # verify it builds
git add -A && git commit -m "Scaffold Next.js 15 + Tailwind + site.config.ts theming system"
```

---

## Task 2: Sanity Setup

**Files:**
- Create: `sanity.config.ts` (project root)
- Create: `sanity/schemas/index.ts`
- Create: `sanity/schemas/service.ts`
- Create: `sanity/schemas/teamMember.ts`
- Create: `sanity/schemas/testimonial.ts`
- Create: `sanity/schemas/post.ts`
- Create: `sanity/schemas/faq.ts`
- Create: `sanity/schemas/siteSettings.ts`
- Create: `src/lib/sanity.ts` (client + queries)
- Create: `src/app/studio/[[...tool]]/page.tsx` (embedded Studio)

**Step 1: Create a new Sanity project**

```bash
# May need to use Sanity CLI or create manually
npx sanity@latest init --project-name "href-starter-kit" --dataset production --output-path sanity --create-project
```

Or create the project via sanity.io/manage and note the project ID.

**Step 2: Create Sanity schemas**

Each schema should be straightforward:

- **siteSettings** (singleton): logo (image), companyName, tagline, phone, email, address, socialLinks, businessHours
- **service**: title, slug, description, icon (string for Lucide icon name), shortDescription, image, features (array of strings), order (number)
- **teamMember**: name, slug, title, credentials (array of strings), bio, photo, specializations (array of strings), email, linkedin, order
- **testimonial**: clientName, clientTitle, company, quote, rating (1-5), photo, featured (boolean)
- **post**: title, slug, publishDate, excerpt, content (markdown), featuredImage, categories, tags, readTime
- **faq**: question, answer, category, order

**Step 3: Create Sanity client library**

`src/lib/sanity.ts` with:
- Client configuration reading projectId and dataset from siteConfig
- GROQ queries for: getAllServices, getService, getAllTeamMembers, getAllTestimonials, getAllPosts, getPost, getAllFaqs, getSiteSettings
- Image URL builder helper

**Step 4: Create embedded Sanity Studio**

`src/app/studio/[[...tool]]/page.tsx` - renders the Sanity Studio at /studio.

**Step 5: Verify and commit**

```bash
npm run dev  # verify Studio loads at /studio
git add -A && git commit -m "Add Sanity schemas and embedded Studio"
```

---

## Task 3: Shared UI Components

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/container.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/textarea.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/section-header.tsx`

**Details:**

All components read from CSS variables for colors, so they automatically theme. Build them as simple, accessible components with Tailwind classes.

- **Button**: Primary, secondary, outline variants. Sizes: sm, md, lg. Support for icons. Uses `bg-[var(--color-primary)]` pattern.
- **Card**: White surface, border, rounded-2xl, shadow-sm, hover:shadow-md. Optional image slot.
- **Container**: Max-width wrapper with responsive padding.
- **Input / Textarea**: Styled form fields with label, error state, required indicator.
- **Badge**: Small pill for categories/tags. Primary and secondary variants.
- **SectionHeader**: Reusable section title + subtitle + optional accent line.

**Commit:**
```bash
git add -A && git commit -m "Add shared UI components with CSS variable theming"
```

---

## Task 4: Layout Components

**Files:**
- Create: `src/components/layout/header.tsx`
- Create: `src/components/layout/footer.tsx`
- Create: `src/components/layout/mobile-nav.tsx`

**Details:**

- **Header**: Logo (from siteConfig), nav links (from siteConfig.navigation), CTA button (e.g., "Contact Us"), mobile hamburger menu trigger. Sticky on scroll. Uses primary color for CTA, white/transparent background.
- **MobileNav**: Slide-in drawer with nav links, phone number, social links. Close button. Body scroll lock when open.
- **Footer**: 4-column grid (About with logo+description, Quick Links, Services, Contact Info). Bottom bar with copyright. Social icons. All data from siteConfig.

**Commit:**
```bash
git add -A && git commit -m "Add header, footer, and mobile navigation"
```

---

## Task 5: Section Components

**Files:**
- Create: `src/components/sections/hero.tsx`
- Create: `src/components/sections/services-grid.tsx`
- Create: `src/components/sections/testimonials.tsx`
- Create: `src/components/sections/cta-section.tsx`
- Create: `src/components/sections/stats-bar.tsx`
- Create: `src/components/sections/faq-accordion.tsx`
- Create: `src/components/sections/team-grid.tsx`
- Create: `src/components/sections/blog-preview.tsx`

**Details:**

- **Hero**: Full-width with background image/gradient. Headline, subtitle, two CTA buttons (primary + secondary). Optionally include trust badges or stats below CTAs. For CPA: "Trusted by [X] businesses" style.
- **ServicesGrid**: 3-column card grid. Each card: Lucide icon, title, short description, "Learn More" link. Pulls from Sanity services.
- **Testimonials**: Carousel or grid of testimonial cards. Star rating, quote, client name/title. Pulls from Sanity.
- **CTASection**: Full-width colored banner with headline, subtitle, CTA button. Uses primary color background.
- **StatsBar**: 3-4 stat counters (e.g., "25+ Years", "500+ Clients", "99% Satisfaction"). Numbers can animate on scroll.
- **FAQAccordion**: Expandable FAQ items with schema.org FAQPage markup. Pulls from Sanity.
- **TeamGrid**: Card grid with photo, name, title, credentials. Click to expand bio or link to individual page.
- **BlogPreview**: Latest 3 blog posts as cards. Featured image, title, excerpt, date.

**Commit:**
```bash
git add -A && git commit -m "Add section components: hero, services, testimonials, CTA, stats, FAQ, team, blog"
```

---

## Task 6: Forms

**Files:**
- Create: `src/components/forms/contact-form.tsx`
- Create: `src/components/forms/newsletter-signup.tsx`
- Create: `src/app/api/contact/route.ts`
- Create: `src/app/api/subscribe/route.ts`

**Details:**

- **ContactForm**: Client component. Fields: name, email, phone, service (dropdown from siteConfig services), message. Honeypot field. Loading/success/error states. Posts to /api/contact.
- **NewsletterSignup**: Client component. Email input + submit. Honeypot. Posts to /api/subscribe. Compact design for footer or sidebar use.
- **API /contact**: Validates fields, checks honeypot, sends email notification (or logs for now). Returns JSON response.
- **API /subscribe**: Validates email, checks honeypot, stores subscriber (or logs for now). Returns JSON response.

Note: Email sending and subscriber storage are placeholders. Each client deployment will configure their own email provider and database.

**Commit:**
```bash
git add -A && git commit -m "Add contact form and newsletter signup with API routes"
```

---

## Task 7: Pages

**Files:**
- Create/Modify: `src/app/page.tsx` (Homepage)
- Create: `src/app/about/page.tsx`
- Create: `src/app/services/page.tsx`
- Create: `src/app/services/[slug]/page.tsx`
- Create: `src/app/team/page.tsx`
- Create: `src/app/contact/page.tsx`
- Create: `src/app/faq/page.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`

**Details:**

Each page composes section components and fetches data from Sanity:

- **Homepage**: Hero + StatsBar + ServicesGrid + Testimonials + CTASection + BlogPreview
- **About**: Company story section, mission/values, team preview (top 3-4 members), CTA
- **Services**: Full services grid with descriptions, link to individual service pages
- **Services/[slug]**: Individual service page with full description, features list, related services, CTA
- **Team**: Full team grid with bios
- **Contact**: ContactForm + Map embed + Contact info (phone, email, address, hours)
- **FAQ**: FAQAccordion grouped by category + CTA
- **Blog**: Blog post listing with pagination
- **Blog/[slug]**: Full blog post with markdown rendering, related posts

Each page includes `generateMetadata` for SEO using siteConfig.seo.titleTemplate.

**Commit:**
```bash
git add -A && git commit -m "Add all page routes: home, about, services, team, contact, FAQ, blog"
```

---

## Task 8: CPA Demo Content

**Files:**
- Create: `sanity/seed/cpa-demo-data.ts` (or use Sanity MCP)

**Details:**

Populate Sanity with realistic CPA firm demo content:

**Services (7):**
1. Tax Preparation
2. Tax Planning & Strategy
3. Bookkeeping & Accounting
4. Audit & Assurance
5. Business Advisory
6. Payroll Services
7. Entity Selection & Structuring

**Team Members (4):**
1. Managing Partner (CPA, MBA)
2. Tax Director (CPA, EA)
3. Senior Accountant (CPA)
4. Bookkeeping Manager

**Testimonials (4):**
1. Small business owner (tax prep)
2. Restaurant owner (bookkeeping)
3. Real estate investor (tax planning)
4. Startup founder (advisory)

**FAQs (8):**
Common CPA firm questions about pricing, process, tax deadlines, document needs, etc.

**Blog Posts (3):**
1. "Tax Season 2026: Key Deadlines Every Business Owner Should Know"
2. "5 Signs Your Business Has Outgrown DIY Bookkeeping"
3. "Choosing the Right Business Entity: LLC vs S-Corp vs C-Corp"

Use Sanity MCP (`mcp__sanity-hrefcreative__create_document`) or a seed script to populate.

**Commit:**
```bash
git add -A && git commit -m "Add CPA demo content seed data"
```

---

## Task 9: SEO & Polish

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `src/app/layout.tsx` (add schema.org markup)
- Create: `src/components/seo/structured-data.tsx`

**Details:**

- **Sitemap**: Dynamic sitemap pulling pages + blog posts + services from Sanity
- **Robots**: Standard robots.txt allowing all crawlers
- **Structured Data**: Schema.org LocalBusiness (from siteConfig), FAQPage (on FAQ page), BlogPosting (on blog posts), Service (on service pages)
- **Meta tags**: Verify all pages have proper title, description, og:image

**Commit:**
```bash
git add -A && git commit -m "Add SEO: sitemap, robots, structured data, meta tags"
```

---

## Task 10: Deploy & Verify

**Step 1: Push to GitHub**

```bash
git push origin main
```

**Step 2: Deploy to Vercel**

```bash
npx vercel --yes
```

Or connect the repo to Vercel via dashboard.

**Step 3: Create a Sanity project for the demo**

Either use the Sanity MCP or sanity.io/manage to create a project. Update `.env.local` with project ID.

**Step 4: Populate demo content**

Run the seed script or manually add content via /studio.

**Step 5: Verify all pages render correctly**

- Homepage loads with all sections
- Services grid populated from Sanity
- Individual service pages work
- Team page shows members
- Contact form submits
- Blog posts render
- FAQ accordion works
- Mobile responsive
- SEO meta tags present

**Step 6: Final commit and push**

```bash
git add -A && git commit -m "Deploy CPA template with demo content"
git push origin main
```

---

## Execution Notes

- **Working directory**: `/Users/angelom/apps/href-starter-kit/`
- **Do NOT use emdashes** in any content, code comments, or copy
- **Do NOT mention Claude/AI** anywhere
- **Use the frontend-design skill** for all component implementation to ensure design quality
- **CPA palette**: Forest Green (#1B4D3E) primary, Gold (#C9A84C) accent, Warm White (#FAFAF8) bg
- **Fonts**: Playfair Display headings, Inter body
- All components must be accessible (ARIA, keyboard nav, proper labels)
- All components must be mobile responsive
- Sanity project for this starter kit is separate from hrefcreative (qstz40ce)
