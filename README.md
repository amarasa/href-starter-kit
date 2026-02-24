# Href Starter Kit

Next.js 15 + Sanity CMS starter kit for industry-specific website templates. Built with Tailwind CSS 4, TypeScript, and a CSS variable theming system driven by `site.config.ts`.

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Add your Sanity project ID and dataset to .env.local
npm run dev
```

## Architecture

- **site.config.ts**: Central configuration file for all branding, colors, fonts, navigation, and feature toggles. Change this file to customize the entire site.
- **CSS Variable Theming**: Colors defined as CSS custom properties, consumed by Tailwind. Swap palettes without rebuilding.
- **Sanity CMS**: Embedded Studio at `/studio`. Schemas for services, team, testimonials, blog posts, FAQs, and site settings.
- **Server Components**: Pages fetch data from Sanity at build/request time with ISR (60s revalidation).

## CPA Template (Default)

The starter kit ships with a CPA/Accounting firm template:
- Forest Green (#1B4D3E) + Gold (#C9A84C) palette
- Playfair Display + Inter fonts
- 7 services, 4 team members, 4 testimonials, 8 FAQs, 3 blog posts

### Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, stats, services, testimonials, CTA, blog preview |
| `/about` | Company story, values, team preview |
| `/services` | Full services grid |
| `/services/[slug]` | Individual service detail |
| `/team` | Full team listing |
| `/contact` | Contact form with business info sidebar |
| `/faq` | FAQ accordion with schema.org markup |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual blog post |
| `/studio` | Sanity Studio (CMS) |

## Seeding Demo Data

```bash
SANITY_TOKEN=your-token node sanity/seed/seed-cpa-data.mjs
```

## Tech Stack

- Next.js 15 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS 4
- Sanity v3
- Lucide React icons

## Creating a New Template

1. Fork this repo
2. Update `site.config.ts` with new branding, colors, fonts, and navigation
3. Update CSS variables in `globals.css` to match
4. Add industry-specific content to Sanity
5. Deploy to Vercel
