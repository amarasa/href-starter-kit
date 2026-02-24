import { type ReactNode, type ButtonHTMLAttributes } from "react";
import Link from "next/link";

const variantStyles = {
  primary:
    "bg-primary text-white hover:bg-primary-light active:bg-primary-light",
  secondary:
    "bg-accent text-white hover:opacity-90 active:opacity-80",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white active:bg-primary-light active:text-white",
} as const;

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
} as const;

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

interface ButtonBaseProps {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Optional icon rendered before the label */
  icon?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Button contents */
  children: ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  /** When provided, renders as a Next.js Link */
  href: string;
  /** Open in new tab */
  target?: string;
  rel?: string;
  disabled?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const baseStyles = [
    "inline-flex items-center justify-center gap-2",
    "rounded-xl font-semibold",
    "transition-all duration-150",
    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Render as Link when href is provided
  if ("href" in rest && rest.href != null) {
    const { href, disabled, target, rel, ...linkRest } = rest as ButtonAsLink;

    if (disabled) {
      return (
        <span className={baseStyles} aria-disabled="true" role="link">
          {icon && <span aria-hidden="true">{icon}</span>}
          {children}
        </span>
      );
    }

    return (
      <Link
        href={href}
        className={baseStyles}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : rel}
        {...linkRest}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </Link>
    );
  }

  // Render as button
  const { disabled, type, ...buttonRest } = rest as ButtonAsButton;

  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      className={baseStyles}
      {...buttonRest}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
}
