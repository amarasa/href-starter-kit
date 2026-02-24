"use client";

import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "./section-header";

interface FaqAccordionProps {
  /** Array of FAQ items to display */
  faqs: FAQ[];
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
}

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${faq._id}`;
  const headingId = `faq-heading-${faq._id}`;

  return (
    <div className="border-b border-border">
      <h3>
        <button
          id={headingId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-sm group"
        >
          <span className="text-lg font-semibold text-text pr-4 group-hover:text-primary transition-colors">
            {faq.question}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-5 text-text-muted leading-relaxed pr-8">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export function FaqAccordion({
  faqs,
  title = "Frequently Asked Questions",
  subtitle,
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  if (faqs.length === 0) return null;

  // schema.org FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Container>
        <SectionHeader title={title} subtitle={subtitle} />

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <FaqItem
              key={faq._id}
              faq={faq}
              isOpen={openId === faq._id}
              onToggle={() => handleToggle(faq._id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
