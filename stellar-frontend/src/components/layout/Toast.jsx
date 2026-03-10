/** Toast — Space-themed toast notification system. */
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

function ToastItem({ toast, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const borderColor =
    toast.type === "error"
      ? "border-[var(--false-positive)]"
      : toast.type === "success"
      ? "border-[var(--confirmed)]"
      : "border-[var(--accent-cyan)]";

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      className={`flex items-start gap-3 p-4 rounded-lg bg-[var(--bg-card)] border ${borderColor} shadow-lg max-w-sm`}
    >
      <p className="font-exo text-sm text-[var(--text-primary)] flex-1">
        {toast.message}
      </p>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

export default function Toast({ toasts, onRemove }) {
  return (
    <div
      className="fixed top-4 right-4 z-[100] flex flex-col gap-2"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}
