/** DemoSignalButton — "LOAD DEMO SIGNAL" ghost button. */
import { Radio } from "lucide-react";

export default function DemoSignalButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 border border-[var(--accent-cyan)] bg-transparent text-[var(--accent-cyan)] font-orbitron text-xs tracking-widest uppercase rounded-lg hover:bg-[rgba(0,212,255,0.08)] hover:shadow-[var(--glow-sm)] transition-all duration-300"
    >
      <Radio size={16} aria-hidden="true" />
      LOAD DEMO SIGNAL
    </button>
  );
}
