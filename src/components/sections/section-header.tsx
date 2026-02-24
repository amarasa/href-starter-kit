import Link from "next/link";

interface SectionHeaderProps {
  /** Section heading text */
  title: string;
  /** Optional subheading text displayed below the title */
  subtitle?: string;
  /** Optional "View All" link displayed to the right of the heading */
  viewAllHref?: string;
  /** Label for the "View All" link. Defaults to "View All". */
  viewAllLabel?: string;
  /** Center-align the header content. Defaults to true. */
  centered?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = "View All",
  centered = true,
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 ${centered ? "text-center" : "flex items-end justify-between gap-4"}`}
    >
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-lg text-text-muted max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded"
        >
          {viewAllLabel}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </div>
  );
}
