/** TelescopeTransition — 3-phase fullscreen cinematic overlay between submission and results. */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function TelescopeTransition({ isActive, onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }
    setPhase(1);
    const t1 = setTimeout(() => setPhase(2), 800);
    const t2 = setTimeout(() => setPhase(3), 1600);
    const t3 = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Dark background with aperture cutout */}
          <motion.div
            className="absolute inset-0 bg-[var(--bg-primary)]"
            animate={{
              clipPath:
                phase >= 3
                  ? "circle(160% at 50% 50%)"
                  : phase >= 1
                  ? "circle(55% at 50% 50%)"
                  : "circle(0% at 50% 50%)",
            }}
            transition={
              phase >= 3
                ? { type: "spring", stiffness: 80, damping: 20 }
                : { duration: 0.8, ease: "easeOut" }
            }
          >
            {/* Starfield within aperture */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[2px] h-[2px] bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.8,
                    animation:
                      phase >= 2
                        ? `shimmer ${0.2 + Math.random() * 0.5}s linear infinite`
                        : "none",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Crosshair overlay */}
          {phase >= 1 && phase < 3 && (
            <motion.div
              className="relative z-10 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="absolute"
              >
                {/* Crosshair lines */}
                <line
                  x1="100"
                  y1="20"
                  x2="100"
                  y2="180"
                  stroke="white"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
                <line
                  x1="20"
                  y1="100"
                  x2="180"
                  y2="100"
                  stroke="white"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
                {/* Inner ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="40"
                  fill="none"
                  stroke="var(--accent-cyan)"
                  strokeWidth="1"
                  opacity="0.6"
                >
                  {phase >= 2 && (
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 100 100"
                      to="360 100 100"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
                {/* Outer ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="var(--accent-cyan)"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </svg>

              {/* Phase 2 text */}
              {phase >= 2 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-xs text-[var(--accent-cyan)] tracking-[0.3em] uppercase mt-[140px] whitespace-nowrap"
                >
                  SIGNAL LOCKED · PROCESSING COMPLETE
                </motion.p>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
