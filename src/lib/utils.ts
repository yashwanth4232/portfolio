/**
 * Utility: merge class names conditionally.
 * Lightweight alternative to clsx — no extra dependency.
 *
 * @example
 * cn("base-class", condition && "conditional-class", "another-class")
 */
export function cn(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Utility: split a string into individual characters for animation.
 * Preserves spaces as non-breaking spaces so layout stays intact.
 *
 * @example
 * splitChars("Hello") → ["H", "e", "l", "l", "o"]
 */
export function splitChars(text: string): string[] {
  return text.split("").map((char) => (char === " " ? "\u00A0" : char));
}

/**
 * Utility: split a string into words for word-level animation.
 */
export function splitWords(text: string): string[] {
  return text.split(" ");
}

/**
 * Utility: clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Utility: linear interpolation.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Utility: map a value from one range to another.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/**
 * Utility: check if running on a touch device.
 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
