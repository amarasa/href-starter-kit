import { type ReactNode } from "react";

type Alignment = "left" | "center" | "right";

const alignmentStyles: Record<Alignment, string> = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

const subtitleAlignment: Record<Alignment, string> = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
};

interface SectionHeaderProps {
  /** Section title text */
  title: string;
  /** Optional subtitle displayed below the title */
  subtitle?: string;
  /** Show the accent line below the title. Defaults to true. */
  accent?: boolean;
  /** Text alignment. Defaults to "center". */
  align?: Alignment;
  /** Optional content rendered after the subtitle (badges, CTAs, etc.) */
  children?: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  accent = true,
  align = "center",
  children,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col ${alignmentStyles[align]} ${className}`.trim()}>
      {accent && (
        <div
          className="w-16 h-1 bg-accent rounded-full mb-4"
          aria-hidden="true"
        />
      )}

      <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text">
        {title}
      </h2>

      {subtitle && (
        <p
          className={`text-lg text-text-muted mt-4 max-w-2xl ${subtitleAlignment[align]}`}
        >
          {subtitle}
        </p>
      )}

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
