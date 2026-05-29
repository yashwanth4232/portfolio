"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ProjectImageProps {
  src: string;
  alt: string;
  /** Optional fallback shown while image loads or if it errors */
  fallback?: ReactNode;
  className?: string;
  /** Priority loading for above-fold images (first 2 projects in the grid) */
  priority?: boolean;
}

/**
 * ProjectImage
 *
 * Wraps next/image with:
 * - Blur placeholder using a lightweight data URI (avoids external requests)
 * - Error state fallback — shows the mockup SVG if the screenshot 404s
 * - Fade-in on load via CSS opacity transition (no JS needed)
 * - Correct sizes prop for the project grid layout
 *
 * SIZES CALCULATION:
 * The project grid is:
 * - Mobile (< 640px):  100vw - 2*1.25rem padding ≈ calc(100vw - 40px)
 * - Tablet (640-1023): 50vw - padding ≈ calc(50vw - 40px)
 * - Desktop (1024px+): ~590px (half of max-width 1280px minus gap)
 *
 * These sizes tell Next.js exactly what width to optimize for,
 * preventing downloading a 1200px image for a 590px slot.
 */
export function ProjectImage({
  src,
  alt,
  fallback,
  className,
  priority = false,
}: ProjectImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(50vw - 40px), 590px"
        quality={80}
        className={cn(
          "object-cover object-top transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        placeholder="blur"
        // Lightweight 1×1 blur data URI — prevents layout shift while loading
        // Replace with a real blurDataURL from next/image's `getBase64Blur` in production
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
      />
    </div>
  );
}
