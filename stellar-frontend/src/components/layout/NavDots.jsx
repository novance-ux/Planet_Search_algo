/** NavDots — Fixed right-side vertical dot navigation showing active section. */
import { motion } from "framer-motion";

const SECTION_LABELS = [
  "Hero",
  "Mission Brief",
  "Input Form",
  "Results",
  "Cosmic Context",
  "Insights",
  "Mission Log",
];

export default function NavDots({ activeIndex, onDotClick }) {
  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {SECTION_LABELS.map((label, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className="group relative flex items-center justify-end"
          aria-label={`Go to ${label}`}
        >
          <span className="absolute right-6 px-2 py-1 rounded text-xs font-mono text-[var(--text-mono)] bg-[var(--bg-card)] border border-[var(--border-subtle)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {label}
          </span>
          <motion.div
            className="rounded-full border border-[var(--accent-cyan)]"
            animate={{
              width: activeIndex === i ? 12 : 8,
              height: activeIndex === i ? 12 : 8,
              backgroundColor:
                activeIndex === i ? "var(--accent-cyan)" : "transparent",
              boxShadow:
                activeIndex === i
                  ? "0 0 12px rgba(0,212,255,0.5)"
                  : "none",
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      ))}
    </nav>
  );
}
