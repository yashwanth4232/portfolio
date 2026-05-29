"use client";

import { motion } from "framer-motion";

export function TerminalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-black p-5 overflow-hidden"
    >
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      <pre className="text-sm text-green-400">
{`> npm run dev
✓ Portfolio loaded
✓ Skills initialized
✓ Projects loaded
✓ Ready`}
      </pre>
    </motion.div>
  );
}