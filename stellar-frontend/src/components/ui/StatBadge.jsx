/** StatBadge — Animated metric pill (e.g., "9,500+ KOIs"). */
import React from "react";
import { motion } from "framer-motion";

const StatBadge = React.memo(function StatBadge({ text, delay = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="inline-flex items-center px-4 py-2 rounded-full border border-[var(--border-glow)] bg-[rgba(0,212,255,0.05)] text-xs font-mono text-[var(--text-mono)] tracking-wider"
    >
      {text}
    </motion.span>
  );
});

export default StatBadge;
