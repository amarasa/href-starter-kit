import { type ReactNode } from "react";
import Image from "next/image";

interface CardImageProps {
  /** Image source URL */
  src: string;
  /** Accessible alt text (use empty string for purely decorative images) */
  alt: string;
  /** Image width in pixels */
  width?: number;
  /** Image height in pixels */
  height?: number;
  /** Load this image eagerly (for above-the-fold cards) */
  priority?: boolean;
}

interface CardProps {
  children: ReactNode;
  /** Optional image displayed at the top of the card */
  image?: CardImageProps;
  /** Additional CSS classes */
  className?: string;
  /** HTML element to render. Defaults to "div". */
  as?: "div" | "article" | "li";
}

export function Card({
  children,
  image,
  className = "",
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={`bg-surface border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-150 overflow-hidden ${className}`.trim()}
    >
      {image && (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 800}
            height={image.height ?? 450}
            priority={image.priority ?? false}
            className="object-cover w-full h-full"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">{children}</div>
    </Component>
  );
}

/** Optional sub-components for structured card content */

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`.trim()}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3" | "h4";
}

export function CardTitle({
  children,
  className = "",
  as: Heading = "h3",
}: CardTitleProps) {
  return (
    <Heading
      className={`text-xl font-bold font-heading text-text ${className}`.trim()}
    >
      {children}
    </Heading>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className = "" }: CardDescriptionProps) {
  return (
    <p className={`text-text-muted text-sm mt-1 ${className}`.trim()}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-border ${className}`.trim()}>
      {children}
    </div>
  );
}
