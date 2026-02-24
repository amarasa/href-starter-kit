import Link from "next/link";
import {
  Calculator,
  FileText,
  BookOpen,
  Shield,
  Briefcase,
  DollarSign,
  Building2,
  TrendingUp,
  Users,
  Scale,
  ClipboardList,
  PiggyBank,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "./section-header";

const iconMap: Record<string, LucideIcon> = {
  calculator: Calculator,
  "file-text": FileText,
  "book-open": BookOpen,
  shield: Shield,
  briefcase: Briefcase,
  "dollar-sign": DollarSign,
  building: Building2,
  "trending-up": TrendingUp,
  users: Users,
  scale: Scale,
  "clipboard-list": ClipboardList,
  "piggy-bank": PiggyBank,
};

interface ServicesGridProps {
  /** Array of services to display */
  services: Service[];
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
}

export function ServicesGrid({
  services,
  title = "Our Services",
  subtitle,
}: ServicesGridProps) {
  return (
    <section aria-labelledby="services-heading" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Briefcase;

            return (
              <article
                key={service._id}
                className="bg-surface border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-150 group"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>

                <h3 className="text-xl font-bold font-heading text-text mb-2">
                  {service.title}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {service.shortDescription}
                </p>

                <Link
                  href={`/services/${service.slug.current}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded"
                >
                  Learn More
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    &rarr;
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
