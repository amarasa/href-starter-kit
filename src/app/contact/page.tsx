import type { Metadata } from "next";
import { siteConfig } from "@/../site.config";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.name} for tax preparation, bookkeeping, and accounting services. Call ${siteConfig.phone} or fill out our contact form.`,
};

export default function ContactPage() {
  const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-light py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading">
              Contact Us
            </h1>
            <p className="mt-6 text-xl text-white/80 leading-relaxed">
              Have a question or ready to get started? We would love to hear
              from you. Reach out using any of the methods below.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold font-heading text-text mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info Sidebar */}
            <div>
              <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
                <h3 className="text-lg font-bold font-heading text-text">
                  Get in Touch
                </h3>

                <div className="space-y-4">
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                    className="flex items-start gap-3 text-text-muted hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <div className="font-medium text-text">Phone</div>
                      <div className="text-sm">{siteConfig.phone}</div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-start gap-3 text-text-muted hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <div className="font-medium text-text">Email</div>
                      <div className="text-sm">{siteConfig.email}</div>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 text-text-muted">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <div className="font-medium text-text">Address</div>
                      <div className="text-sm">{fullAddress}</div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                    <h4 className="font-medium text-text">Business Hours</h4>
                  </div>
                  <dl className="space-y-2">
                    {siteConfig.hours.map((schedule) => (
                      <div key={schedule.day} className="flex justify-between text-sm">
                        <dt className="text-text-muted">{schedule.day}</dt>
                        <dd className="font-medium text-text">{schedule.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
