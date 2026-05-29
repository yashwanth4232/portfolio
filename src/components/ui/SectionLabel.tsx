import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Small uppercase label with a decorative accent line.
 * Rendered as a <span> — wrap in a block element as needed.
 *
 * @example
 * <SectionLabel>About me</SectionLabel>
 */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span className={cn("section-label", className)}>
      {children}
    </span>
  );
}
