import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/**
 * Small monospace tag pill for tech stack labels.
 *
 * @example
 * <Badge>TypeScript</Badge>
 */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn("badge", className)}>
      {children}
    </span>
  );
}
