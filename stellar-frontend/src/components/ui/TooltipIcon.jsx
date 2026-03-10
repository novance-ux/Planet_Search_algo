/** TooltipIcon — ⓘ icon with hover floating tooltip card. */
import { useState } from "react";
import { Info } from "lucide-react";

export default function TooltipIcon({ text }) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-flex ml-1 cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      tabIndex={0}
      role="button"
      aria-label="Show tooltip"
    >
      <Info size={14} className="text-[var(--text-secondary)]" aria-hidden="true" />
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-glow)] text-xs font-exo text-[var(--text-primary)] whitespace-normal w-48 text-center z-50 shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
}
