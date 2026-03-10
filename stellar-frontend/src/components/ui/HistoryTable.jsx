/** HistoryTable — Terminal-styled prediction log table. */
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Trash2 } from "lucide-react";

export default function HistoryTable({ history, onClear, onRerun }) {
  if (history.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 font-mono text-sm text-[var(--text-secondary)]">
        <span>{">"} NO PREVIOUS MISSIONS LOGGED</span>
        <span className="typewriter-cursor" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="font-mono text-xs text-[var(--text-secondary)]">
          {history.length} prediction{history.length !== 1 ? "s" : ""} logged
        </span>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs font-mono text-[var(--false-positive)] hover:underline"
        >
          <Trash2 size={12} aria-hidden="true" />
          CLEAR LOG
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="text-[var(--text-secondary)] border-b border-[var(--border-subtle)]">
              <th className="py-2 px-2 text-left">#</th>
              <th className="py-2 px-2 text-left">TIMESTAMP</th>
              <th className="py-2 px-2 text-left">ORBITAL PERIOD</th>
              <th className="py-2 px-2 text-left">STELLAR TEMP</th>
              <th className="py-2 px-2 text-left">RESULT</th>
              <th className="py-2 px-2 text-left">CONFIDENCE</th>
              <th className="py-2 px-2 text-left">RADIUS</th>
              <th className="py-2 px-2 text-left">RE-RUN</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {history.map((entry, i) => (
                <motion.tr
                  key={entry.id}
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 60, opacity: 0 }}
                  className="border-b border-[var(--border-subtle)] history-flash"
                >
                  <td className="py-2 px-2 text-[var(--text-secondary)]">
                    {history.length - i}
                  </td>
                  <td className="py-2 px-2 text-[var(--text-mono)]">
                    {entry.timestamp}
                  </td>
                  <td className="py-2 px-2 text-[var(--text-mono)]">
                    {entry.inputs?.koi_period ?? "—"}
                  </td>
                  <td className="py-2 px-2 text-[var(--text-mono)]">
                    {entry.inputs?.koi_steff ?? "—"}
                  </td>
                  <td className="py-2 px-2">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold"
                      style={{
                        color:
                          entry.classification === "CONFIRMED"
                            ? "var(--confirmed)"
                            : "var(--false-positive)",
                        backgroundColor:
                          entry.classification === "CONFIRMED"
                            ? "rgba(0,255,136,0.1)"
                            : "rgba(255,68,102,0.1)",
                      }}
                    >
                      {entry.classification}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-[var(--text-mono)]">
                    {((entry.probability ?? 0) * 100).toFixed(1)}%
                  </td>
                  <td className="py-2 px-2 text-[var(--text-mono)]">
                    {entry.radius?.toFixed(2) ?? "—"} R⊕
                  </td>
                  <td className="py-2 px-2">
                    <button
                      onClick={() => onRerun(entry.inputs)}
                      className="p-1 rounded hover:bg-[rgba(0,212,255,0.1)] text-[var(--accent-cyan)] transition-colors"
                      aria-label="Re-run this prediction"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
