/** PlanetVisual — Pure CSS Earth + predicted planet side-by-side comparison (replaces Three.js PlanetScene). */
import { motion } from "framer-motion";
import { getPlanetType } from "../../utils/planetClassifier";

export default function PlanetVisual({ predictedRadius, backendType, onClick }) {
  const earthR = 1;
  const clampedR = Math.min(predictedRadius, 8);
  const planetType = getPlanetType(predictedRadius, backendType);
  const ratio = predictedRadius.toFixed(1);

  /* Sizes: Earth = 60px, planet scales relative to that */
  const earthPx = 60;
  const planetPx = Math.max(20, Math.min(earthPx * clampedR, 200));

  return (
    <div
      className="w-full rounded-xl bg-[#020818] border border-[var(--border-subtle)] overflow-hidden cursor-pointer group relative"
      onClick={onClick}
    >
      {/* Star field background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1 + Math.random() * 1.5}px`,
              height: `${1 + Math.random() * 1.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative flex items-center justify-center gap-12 md:gap-20 py-14 px-6">
        {/* Earth */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          <div
            className="rounded-full relative"
            style={{
              width: earthPx,
              height: earthPx,
              background: "radial-gradient(circle at 35% 35%, #4FC3F7, #1565C0, #0D47A1)",
              boxShadow: "0 0 30px rgba(79, 195, 247, 0.3), inset -8px -8px 20px rgba(0,0,0,0.4)",
            }}
          >
            {/* Surface detail — continents hint */}
            <div className="absolute top-[20%] left-[15%] w-[30%] h-[25%] rounded-full bg-[#2E7D32]/40" />
            <div className="absolute top-[50%] left-[40%] w-[35%] h-[20%] rounded-full bg-[#2E7D32]/30" />
            <div className="absolute top-[25%] right-[15%] w-[20%] h-[30%] rounded-full bg-[#2E7D32]/25" />
            {/* Atmosphere glow */}
            <div
              className="absolute inset-[-4px] rounded-full pointer-events-none"
              style={{ boxShadow: "inset 0 0 15px rgba(79, 195, 247, 0.2)" }}
            />
          </div>
          <div className="text-center">
            <p className="font-mono text-xs text-[var(--accent-cyan)]">EARTH</p>
            <p className="font-mono text-[10px] text-[var(--text-secondary)]">1.0 R⊕</p>
          </div>
        </motion.div>

        {/* Comparison line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="hidden md:flex flex-col items-center gap-1"
        >
          <div className="w-16 h-px bg-[var(--accent-cyan)]/30" />
          <span className="font-mono text-[10px] text-[var(--accent-gold)]">
            ×{ratio}
          </span>
          <div className="w-16 h-px bg-[var(--accent-cyan)]/30" />
        </motion.div>

        {/* Predicted planet */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="rounded-full relative"
            style={{
              width: planetPx,
              height: planetPx,
              background: `radial-gradient(circle at 35% 35%, ${planetType.color}cc, ${planetType.color}88, ${planetType.color}44)`,
              boxShadow: `0 0 40px ${planetType.color}40, inset -10px -10px 25px rgba(0,0,0,0.5)`,
            }}
          >
            {/* Surface bands */}
            <div
              className="absolute top-[30%] left-0 w-full h-[8%] rounded-full"
              style={{ background: `${planetType.color}30` }}
            />
            <div
              className="absolute top-[55%] left-0 w-full h-[6%] rounded-full"
              style={{ background: `${planetType.color}20` }}
            />
            {/* Atmosphere */}
            <div
              className="absolute inset-[-4px] rounded-full pointer-events-none"
              style={{ boxShadow: `inset 0 0 20px ${planetType.color}30` }}
            />
          </motion.div>
          <div className="text-center">
            <p className="font-mono text-xs" style={{ color: planetType.color }}>
              {planetType.label.toUpperCase()}
            </p>
            <p className="font-mono text-[10px] text-[var(--text-secondary)]">
              {ratio} R⊕
            </p>
          </div>
        </motion.div>
      </div>

      {/* Click hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-xl">
        <span className="font-mono text-sm text-[var(--accent-cyan)] px-4 py-2 rounded-lg bg-[rgba(0,0,0,0.7)] border border-[var(--border-glow)]">
          Click to view planet details
        </span>
      </div>
    </div>
  );
}
