/** HistorySection — Section 8: terminal-styled prediction history with re-run. */
import { motion } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import HistoryTable from "../ui/HistoryTable";

export default function HistorySection({ history, onClear, onRerun }) {
  return (
    <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-8">
      <div>
        <SectionLabel text="MISSION_LOG · PREVIOUS_ANALYSES" />
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold">
          Mission Log
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] border-t-2 border-t-[var(--confirmed)]"
      >
        <HistoryTable history={history} onClear={onClear} onRerun={onRerun} />
      </motion.div>
    </div>
  );
}
