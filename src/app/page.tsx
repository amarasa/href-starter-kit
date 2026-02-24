import { siteConfig } from "@/../site.config";
import { getAllServices, getAllTestimonials, getAllPosts, type Service, type Testimonial, type Post } from "@/lib/sanity";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta-section";
import { BlogPreview } from "@/components/sections/blog-preview";

export const revalidate = 60;

export default async function HomePage() {
  let services: Service[] = [];
  let testimonials: Testimonial[] = [];
  let posts: Post[] = [];

  try {
    services = await getAllServices();
  } catch {
    // Sanity not populated yet
  }
  try {
    testimonials = await getAllTestimonials();
  } catch {
    // Sanity not populated yet
  }
  try {
    posts = await getAllPosts();
  } catch {
    // Sanity not populated yet
  }

  return (
    <>
      <Hero
        headline="Expert Accounting Services You Can Trust"
        subtitle="From tax preparation to business advisory, our experienced CPAs deliver personalized financial solutions that help you and your business thrive."
        primaryCta={{ label: "Get a Free Consultation", href: "/contact" }}
        secondaryCta={{ label: "Our Services", href: "/services" }}
        stats={[...siteConfig.stats]}
      />

      <StatsBar stats={[...siteConfig.stats]} />

      {services.length > 0 && (
        <ServicesGrid
          services={services}
          title="Our Services"
          subtitle="Comprehensive accounting solutions tailored to your needs"
        />
      )}

      {testimonials.length > 0 && (
        <Testimonials
          testimonials={testimonials}
          title="What Our Clients Say"
          subtitle="Trusted by hundreds of businesses and individuals across Connecticut"
        />
      )}

      <CtaSection
        headline="Ready to Take Control of Your Finances?"
        subtitle="Schedule a free consultation with one of our experienced CPAs today."
        buttonText="Schedule a Consultation"
        buttonHref="/contact"
        phone={siteConfig.phone}
      />

      {posts.length > 0 && (
        <BlogPreview
          posts={posts.slice(0, 3)}
          title="Latest from Our Blog"
          subtitle="Insights and tips to help you make smarter financial decisions"
        />
      )}
    </>
  );
}
