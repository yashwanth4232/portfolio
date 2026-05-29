"use client";

interface HighlightCardProps {
  title: string;
  description: string;
}

export function HighlightCard({
  title,
  description,
}: HighlightCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 p-6">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-400">
        {description}
      </p>
    </div>
  );
}
