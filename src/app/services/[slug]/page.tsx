import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/../site.config";
import { getService, getAllServices, type Service } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CtaSection } from "@/components/sections/cta-section";
import { ServiceSchema } from "@/components/seo/structured-data";
import { CheckCircle } from "lucide-react";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const services = await getAllServices();
    return services.map((service) => ({ slug: service.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.shortDescription || service.description?.slice(0, 160),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  let relatedServices: Service[] = [];
  try {
    const allServices = await getAllServices();
    relatedServices = allServices
      .filter((s) => s._id !== service._id)
      .slice(0, 3);
  } catch {
    // Sanity not populated yet
  }

  return (
    <>
      <ServiceSchema
        name={service.title}
        description={service.description || service.shortDescription || ""}
        url={`${siteConfig.seo.siteUrl}/services/${slug}`}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-light py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading">
              {service.title}
            </h1>
            {service.shortDescription && (
              <p className="mt-6 text-xl text-white/80 leading-relaxed">
                {service.shortDescription}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {service.description && (
                <div className="prose prose-lg max-w-none text-text-muted leading-relaxed">
                  {service.description.split("\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              )}

              {service.features && service.features.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold font-heading text-text mb-6">
                    What&apos;s Included
                  </h2>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle
                          className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-surface border border-border rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold font-heading text-text mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-sm text-text-muted mb-6">
                  Contact us for a free consultation about our {service.title.toLowerCase()} services.
                </p>
                <Button href="/contact" variant="primary" className="w-full">
                  Contact Us
                </Button>
                <div className="mt-4 text-center">
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                    className="text-sm text-primary hover:text-primary-light font-medium"
                  >
                    Or call {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-surface">
          <Container>
            <h2 className="text-2xl font-bold font-heading text-text mb-8 text-center">
              Other Services You May Need
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedServices.map((related) => (
                <a
                  key={related._id}
                  href={`/services/${related.slug.current}`}
                  className="bg-background border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold font-heading text-text mb-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-text-muted line-clamp-2">
                    {related.shortDescription}
                  </p>
                </a>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaSection
        headline="Let Us Handle the Numbers"
        subtitle="Focus on what you do best while our team takes care of your financial needs."
        buttonText="Get a Free Consultation"
        buttonHref="/contact"
        phone={siteConfig.phone}
      />
    </>
  );
}
