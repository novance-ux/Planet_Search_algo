/** SectionLabel — Reusable `// LABEL` with typewriter reveal on scroll. */
import React from "react";
import { motion } from "framer-motion";

const SectionLabel = React.memo(function SectionLabel({ text }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="font-mono text-xs text-[var(--accent-cyan)] tracking-widest mb-4"
    >
      // {text}
      <span className="typewriter-cursor" />
    </motion.p>
  );
});

export default SectionLabel;
