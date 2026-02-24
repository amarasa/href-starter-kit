import type { Metadata } from "next";
import { siteConfig } from "@/../site.config";
import { getAllServices, type Service } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Our Services",
  description: `Explore the full range of accounting and financial services offered by ${siteConfig.name}, including tax preparation, bookkeeping, audit, and business advisory.`,
};

export const revalidate = 60;

export default async function ServicesPage() {
  let services: Service[] = [];
  try {
    services = await getAllServices();
  } catch {
    // Sanity not populated yet
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-light py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading">
              Our Services
            </h1>
            <p className="mt-6 text-xl text-white/80 leading-relaxed">
              From individual tax returns to comprehensive business advisory,
              we offer the full spectrum of accounting services your business needs.
            </p>
          </div>
        </Container>
      </section>

      {services.length > 0 ? (
        <ServicesGrid
          services={services}
          title="What We Offer"
          subtitle="Each service is delivered by experienced professionals committed to your financial success"
        />
      ) : (
        <section className="py-16">
          <Container>
            <p className="text-text-muted text-center">
              Services will appear here once content is added to the CMS.
            </p>
          </Container>
        </section>
      )}

      <CtaSection
        headline="Not Sure Which Service You Need?"
        subtitle="Schedule a free consultation and we will help you find the right solution."
        buttonText="Schedule a Consultation"
        buttonHref="/contact"
        phone={siteConfig.phone}
      />
    </>
  );
}
