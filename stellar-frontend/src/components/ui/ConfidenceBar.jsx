/** ConfidenceBar — Horizontal animated probability fill bar. */
import { motion } from "framer-motion";
import NumberCounter from "./NumberCounter";

export default function ConfidenceBar({ probability }) {
  const pct = (probability ?? 0) * 100;
  const barColor =
    pct >= 70 ? "var(--confirmed)" : pct >= 40 ? "var(--warning)" : "var(--false-positive)";

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between mb-1">
        <span className="font-exo text-xs text-[var(--text-secondary)] uppercase tracking-wider">
          Classification Confidence
        </span>
        <NumberCounter target={pct} decimals={1} suffix="%" />
      </div>
      <div className="w-full h-3 bg-[var(--bg-input)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}
