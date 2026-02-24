import { type ReactNode } from "react";

const variantStyles = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
} as const;

type BadgeVariant = keyof typeof variantStyles;

interface BadgeProps {
  children: ReactNode;
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Additional CSS classes */
  className?: string;
}

export function Badge({
  children,
  variant = "primary",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${variantStyles[variant]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
