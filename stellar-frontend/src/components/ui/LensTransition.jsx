/** LensTransition — Fullscreen eyepiece → objective lens cinematic transition after login. */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LensTransition({ isActive, onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }
    /* Phase 1: Eyepiece view (small circle center) */
    setPhase(1);
    /* Phase 2: Traveling through tube (expanding) */
    const t1 = setTimeout(() => setPhase(2), 1000);
    /* Phase 3: Reaching objective lens (large circle, stars visible) */
    const t2 = setTimeout(() => setPhase(3), 2200);
    /* Phase 4: Objective opens fully */
    const t3 = setTimeout(() => setPhase(4), 3200);
    /* Done */
    const t4 = setTimeout(() => onComplete(), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Black background */}
          <div className="absolute inset-0 bg-black" />

          {/* Circular lens view */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, transparent 0%, black 0%)",
            }}
            animate={{
              clipPath:
                phase === 1
                  ? "circle(3% at 50% 50%)"
                  : phase === 2
                  ? "circle(20% at 50% 50%)"
                  : phase === 3
                  ? "circle(45% at 50% 50%)"
                  : "circle(100% at 50% 50%)",
            }}
            transition={{
              duration: phase <= 2 ? 1.0 : phase === 3 ? 0.8 : 0.6,
              ease: phase >= 3 ? [0.25, 0.46, 0.45, 0.94] : "easeOut",
            }}
          >
            {/* Inside the lens: stars & planet preview */}
            <div className="w-full h-full bg-[#020818] relative overflow-hidden">
              {/* Stars rushing past */}
              {Array.from({ length: 80 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${1 + Math.random() * 2}px`,
                    height: `${1 + Math.random() * 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={
                    phase >= 2
                      ? {
                          opacity: [0, 1, 0],
                          scale: [0.5, 1.5, 0.5],
                        }
                      : { opacity: Math.random() * 0.6 + 0.2 }
                  }
                  transition={{
                    duration: 0.6 + Math.random() * 0.8,
                    repeat: Infinity,
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}

              {/* Planet preview in center */}
              {phase >= 3 && (
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-900 shadow-[0_0_60px_rgba(0,212,255,0.4)]">
                    {/* Surface details */}
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <div className="absolute top-[20%] left-[15%] w-8 h-6 rounded-full bg-cyan-500/20" />
                      <div className="absolute top-[50%] left-[40%] w-12 h-5 rounded-full bg-blue-400/15" />
                      <div className="absolute top-[30%] right-[20%] w-6 h-8 rounded-full bg-indigo-400/20" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Lens ring overlays */}
          <motion.div
            className="absolute pointer-events-none"
            animate={{
              opacity: phase >= 1 && phase <= 3 ? 1 : 0,
            }}
          >
            {/* Eyepiece ring */}
            <svg width="500" height="500" viewBox="0 0 500 500" className="w-[80vmin] h-[80vmin]">
              <circle
                cx="250" cy="250"
                r={phase >= 3 ? 220 : phase >= 2 ? 120 : 40}
                fill="none"
                stroke="var(--accent-cyan)"
                strokeWidth="1"
                opacity="0.4"
                style={{ transition: "r 1s ease-out" }}
              />
              <circle
                cx="250" cy="250"
                r={phase >= 3 ? 240 : phase >= 2 ? 130 : 45}
                fill="none"
                stroke="var(--accent-cyan)"
                strokeWidth="0.5"
                opacity="0.2"
                style={{ transition: "r 1s ease-out" }}
              />
              {/* Crosshairs */}
              {phase >= 1 && phase < 4 && (
                <>
                  <line x1="250" y1="50" x2="250" y2="450" stroke="white" strokeWidth="0.3" opacity="0.3" />
                  <line x1="50" y1="250" x2="450" y2="250" stroke="white" strokeWidth="0.3" opacity="0.3" />
                </>
              )}
            </svg>
          </motion.div>

          {/* Status text */}
          <motion.div
            className="absolute bottom-[15%] z-10"
            animate={{ opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-mono text-xs text-[var(--accent-cyan)] tracking-[0.3em] uppercase text-center">
              {phase === 2 && "PASSING THROUGH EYEPIECE LENS..."}
              {phase === 3 && "REACHING OBJECTIVE LENS..."}
              {phase === 4 && "PERSONAL COSMIC EXPLORATION"}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
