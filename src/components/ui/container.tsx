import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** HTML element to render. Defaults to "div". */
  as?: "div" | "section" | "article" | "main" | "aside";
}

export function Container({
  children,
  className = "",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`.trim()}>
      {children}
    </Component>
  );
}
