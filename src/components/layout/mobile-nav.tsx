"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { siteConfig } from "@/../site.config";
import { X, Phone, Mail, Linkedin, Twitter, Instagram, Youtube } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
};

export function MobileNav({ isOpen, setIsOpen }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus the close button when the nav opens
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        close();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  // Trap focus inside the panel
  useEffect(() => {
    if (!isOpen) return;

    function handleTab(event: KeyboardEvent) {
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // Collect active social links
  const activeSocials = Object.entries(siteConfig.social).filter(
    ([, url]) => url && url.length > 0
  );

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={`fixed inset-0 z-[60] lg:hidden transition-visibility ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      {/* Backdrop overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        ref={panelRef}
        className={`absolute right-0 top-0 h-full w-full max-w-sm bg-surface shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-heading text-lg font-bold text-primary">
            {siteConfig.name}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-lg text-text-muted transition-colors duration-150 hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={close}
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto h-[calc(100%-65px)]">
          {/* Navigation links */}
          <nav aria-label="Mobile navigation" className="px-4 py-6">
            <ul className="space-y-1" role="list">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-text rounded-lg transition-colors duration-150 hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA button */}
          <div className="px-4 pb-6">
            <Link
              href="/contact"
              className="flex items-center justify-center w-full bg-primary text-white px-5 py-3 rounded-xl text-base font-semibold transition-all duration-150 hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={close}
            >
              Contact Us
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t border-border mx-4" role="separator" />

          {/* Contact info */}
          <div className="px-4 py-6 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Get in Touch
            </h3>

            <a
              href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-text transition-colors duration-150 hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`Call us at ${siteConfig.phone}`}
            >
              <Phone className="h-4 w-4 text-accent flex-shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium">{siteConfig.phone}</span>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-text transition-colors duration-150 hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`Email us at ${siteConfig.email}`}
            >
              <Mail className="h-4 w-4 text-accent flex-shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium">{siteConfig.email}</span>
            </a>
          </div>

          {/* Social links */}
          {activeSocials.length > 0 && (
            <div className="px-4 pb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3 px-4">
                Follow Us
              </h3>
              <div className="flex items-center gap-2 px-4">
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
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-text-muted transition-colors duration-150 hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-text-muted transition-colors duration-150 hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label={`Follow us on ${label}`}
                    >
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
