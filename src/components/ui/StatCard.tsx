"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-md"
    >
      <h3 className="text-3xl font-bold">{value}</h3>
      <p className="mt-2 text-sm text-neutral-400">{label}</p>
    </motion.div>
  );
}