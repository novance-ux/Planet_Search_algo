/** ClassificationBadge — Animated green/red verdict badge. */
import { motion } from "framer-motion";

export default function ClassificationBadge({ classification }) {
  const isConfirmed = classification === "CONFIRMED";

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex flex-col items-center gap-3"
    >
      <div
        className="px-8 py-4 rounded-xl font-orbitron text-xl md:text-2xl tracking-wider border-2"
        style={{
          color: isConfirmed ? "var(--confirmed)" : "var(--false-positive)",
          borderColor: isConfirmed
            ? "var(--confirmed)"
            : "var(--false-positive)",
          boxShadow: isConfirmed
            ? "0 0 30px rgba(0,255,136,0.3)"
            : "0 0 30px rgba(255,68,102,0.3)",
        }}
      >
        {isConfirmed ? "✓ CONFIRMED EXOPLANET" : "✗ FALSE POSITIVE DETECTED"}
      </div>
      <p className="font-exo text-sm text-[var(--text-secondary)]">
        {isConfirmed
          ? "Signal verified as a genuine planetary transit"
          : "Signal consistent with binary star interference or instrumental artifact"}
      </p>
    </motion.div>
  );
}
