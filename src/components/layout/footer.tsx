import Link from "next/link";
import { siteConfig } from "@/../site.config";
import { Phone, Mail, MapPin, Clock, Linkedin, Twitter, Instagram, Youtube } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Tax Preparation", href: "/services/tax-preparation" },
  { label: "Bookkeeping", href: "/services/bookkeeping" },
  { label: "Business Advisory", href: "/services/business-advisory" },
];

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`;

  // Collect active social links
  const activeSocials = Object.entries(siteConfig.social).filter(
    ([, url]) => url && url.length > 0
  );

  return (
    <footer role="contentinfo">
      {/* Main Footer */}
      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* About Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link
                href="/"
                className="inline-block font-heading text-xl font-bold text-white mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                aria-label={`${siteConfig.name} - Home`}
              >
                {siteConfig.name}
              </Link>
              <p className="text-sm font-medium text-white/80 mb-4">
                {siteConfig.tagline}
              </p>
              <p className="text-sm leading-relaxed text-white/70">
                {siteConfig.description}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading text-base font-semibold text-white mb-4">
                Quick Links
              </h3>
              <nav aria-label="Quick links">
                <ul className="space-y-2.5" role="list">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-heading text-base font-semibold text-white mb-4">
                Services
              </h3>
              <nav aria-label="Services">
                <ul className="space-y-2.5" role="list">
                  {serviceLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-heading text-base font-semibold text-white mb-4">
                Contact Us
              </h3>
              <address className="not-italic space-y-3">
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-start gap-3 text-sm text-white/70 transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                  aria-label={`Call us at ${siteConfig.phone}`}
                >
                  <Phone className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{siteConfig.phone}</span>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 text-sm text-white/70 transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                  aria-label={`Email us at ${siteConfig.email}`}
                >
                  <Mail className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{siteConfig.email}</span>
                </a>

                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{fullAddress}</span>
                </div>
              </address>

              {/* Business Hours */}
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span className="text-sm font-medium text-white/90">Business Hours</span>
                </div>
                <dl className="space-y-1 pl-6">
                  {siteConfig.hours.map((schedule) => (
                    <div key={schedule.day} className="flex justify-between text-xs text-white/60 gap-2">
                      <dt>{schedule.day}</dt>
                      <dd>{schedule.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/50">
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>

            {/* Social Icons */}
            {activeSocials.length > 0 && (
              <div className="flex items-center gap-1" role="list" aria-label="Social media links">
                {activeSocials.map(([platform, url]) => {
                  const IconComponent = socialIcons[platform];
                  const label = platform.charAt(0).toUpperCase() + platform.slice(1);

                  if (platform === "facebook") {
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="listitem"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-white/50 transition-colors duration-150 hover:text-accent hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                        aria-label={`Follow us on Facebook`}
                      >
                        <span className="text-sm font-bold" aria-hidden="true">f</span>
                      </a>
                    );
                  }

                  if (!IconComponent) return null;

                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="listitem"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-white/50 transition-colors duration-150 hover:text-accent hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                      aria-label={`Follow us on ${label}`}
                    >
                      <IconComponent className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
