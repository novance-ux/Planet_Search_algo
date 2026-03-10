/** RadarLoader — CSS radar sweep fullscreen overlay during API call. */
import { useEffect, useState } from "react";

export default function RadarLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 8;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[80] bg-[var(--bg-primary)]/95 flex flex-col items-center justify-center gap-8">
      {/* Radar circles */}
      <div className="relative w-48 h-48">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-[var(--accent-cyan)]"
            style={{
              opacity: 0.15 + i * 0.1,
              transform: `scale(${0.33 * i})`,
            }}
          />
        ))}
        {/* Sweep arm */}
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-[2px] origin-left"
          style={{
            background:
              "linear-gradient(90deg, var(--accent-cyan), transparent)",
            animation: "radar-sweep 2s linear infinite",
          }}
        />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_12px_var(--accent-cyan)]" />
      </div>

      <p className="font-orbitron text-sm text-[var(--accent-cyan)] tracking-[0.2em] uppercase">
        ANALYZING SIGNAL
        <span className="animate-pulse">...</span>
      </p>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-[var(--bg-card)] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-violet)] transition-all duration-300 ease-out rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}
