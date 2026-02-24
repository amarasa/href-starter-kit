import { Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  /** Primary headline */
  headline: string;
  /** Supporting text below the headline */
  subtitle: string;
  /** CTA button label */
  buttonText: string;
  /** CTA button destination */
  buttonHref: string;
  /** Optional phone number displayed alongside the CTA */
  phone?: string;
}

export function CtaSection({
  headline,
  subtitle,
  buttonText,
  buttonHref,
  phone,
}: CtaSectionProps) {
  return (
    <section aria-label="Call to action" className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light"
        aria-hidden="true"
      />

      <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
            {headline}
          </h2>

          <p className="mt-4 text-lg text-white/80 leading-relaxed">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={buttonHref}
              variant="secondary"
              size="lg"
            >
              {buttonText}
            </Button>

            {phone && (
              <a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-2 text-white font-semibold hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded px-2 py-1"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                <span>{phone}</span>
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
