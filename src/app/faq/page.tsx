import type { Metadata } from "next";
import { siteConfig } from "@/../site.config";
import { getAllFaqs, type FAQ } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Find answers to common questions about ${siteConfig.name}'s accounting services, pricing, processes, and more.`,
};

export const revalidate = 60;

export default async function FaqPage() {
  let faqs: FAQ[] = [];
  try {
    faqs = await getAllFaqs();
  } catch {
    // Sanity not populated yet
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-light py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-xl text-white/80 leading-relaxed">
              Find answers to the most common questions about our services,
              processes, and what to expect when working with us.
            </p>
          </div>
        </Container>
      </section>

      {faqs.length > 0 ? (
        <FaqAccordion
          faqs={faqs}
          title="Common Questions"
          subtitle="If you do not find your answer here, feel free to contact us directly"
        />
      ) : (
        <section className="py-16">
          <Container>
            <p className="text-text-muted text-center">
              FAQs will appear here once content is added to the CMS.
            </p>
          </Container>
        </section>
      )}

      <CtaSection
        headline="Still Have Questions?"
        subtitle="Our team is here to help. Reach out anytime and we will get back to you within 24 hours."
        buttonText="Contact Us"
        buttonHref="/contact"
        phone={siteConfig.phone}
      />
    </>
  );
}
