import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/sanity";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "./section-header";

interface TestimonialsProps {
  /** Array of testimonials to display */
  testimonials: Testimonial[];
  /** Section heading */
  title?: string;
  /** Section subheading */
  subtitle?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "fill-accent text-accent"
              : "fill-border text-border"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Testimonials({
  testimonials,
  title = "What Our Clients Say",
  subtitle,
}: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-16 sm:py-20 lg:py-24 bg-background"
    >
      <Container>
        <SectionHeader title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial._id}
              className="bg-surface border border-border rounded-2xl p-8 flex flex-col"
            >
              <Quote
                className="w-8 h-8 text-accent mb-4 shrink-0"
                aria-hidden="true"
              />

              <p className="text-text leading-relaxed flex-1 mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="mt-auto">
                <StarRating rating={testimonial.rating} />

                <footer className="mt-4">
                  <cite className="not-italic">
                    <span className="block font-semibold text-text">
                      {testimonial.clientName}
                    </span>
                    {(testimonial.clientTitle || testimonial.company) && (
                      <span className="block text-sm text-text-muted mt-0.5">
                        {testimonial.clientTitle}
                        {testimonial.clientTitle && testimonial.company
                          ? ", "
                          : ""}
                        {testimonial.company}
                      </span>
                    )}
                  </cite>
                </footer>
              </div>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
