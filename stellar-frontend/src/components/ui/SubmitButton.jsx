/** SubmitButton — Primary submit with ripple + loading state. */
import { useState } from "react";

export default function SubmitButton({ isLoading, onClick }) {
  const [ripple, setRipple] = useState(null);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    });
    setTimeout(() => setRipple(null), 600);
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className="relative overflow-hidden w-full px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#0099bb] text-[var(--bg-primary)] font-orbitron text-sm tracking-[0.14em] uppercase rounded-lg hover:brightness-110 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        animation: isLoading ? "none" : "pulse-btn 2s ease-in-out infinite",
      }}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          ANALYZING
          <span className="animate-pulse">...</span>
        </span>
      ) : (
        "INITIATE SIGNAL ANALYSIS"
      )}

      {ripple && (
        <span
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animation: "ripple 0.6s ease-out forwards",
          }}
        />
      )}
    </button>
  );
}
