/** PlanetDetailModal — Shown when clicking the planet. Displays: size, habitability, size comparison, type, temperature. */
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { getPlanetType, getHabitability } from "../../utils/planetClassifier";
import NumberCounter from "./NumberCounter";

export default function PlanetDetailModal({ result, inputs, onClose }) {
  const radius = result.predicted_radius;
  const planetType = getPlanetType(radius, result.planet_type);
  const hab = getHabitability(
    radius,
    Number(inputs.koi_steff),
    Number(inputs.koi_period)
  );

  const earthRadius = 6371;
  const predictedKm = (radius * earthRadius).toFixed(0);
  const sizeComparison =
    radius > 1
      ? `${radius.toFixed(2)}× larger than Earth`
      : radius < 1
      ? `${(1 / radius).toFixed(2)}× smaller than Earth`
      : "Same size as Earth";

  const tempK = Number(inputs.koi_steff) || 0;
  const tempC = tempK > 0 ? (tempK - 273).toFixed(0) : "—";

  const details = [
    {
      label: "SIZE",
      icon: "📏",
      content: (
        <div>
          <p className="font-orbitron text-xl text-[var(--accent-cyan)]">
            <NumberCounter target={radius} decimals={2} suffix=" R⊕" />
          </p>
          <p className="font-mono text-xs text-[var(--text-mono)] mt-1">
            ~{Number(predictedKm).toLocaleString()} km radius
          </p>
        </div>
      ),
    },
    {
      label: "SIZE COMPARISON TO EARTH",
      icon: "🌍",
      content: (
        <div>
          <p className="font-orbitron text-sm text-[var(--accent-gold)]">
            {sizeComparison}
          </p>
          {/* Visual bar comparison */}
          <div className="flex items-end gap-3 mt-3">
            <div className="flex flex-col items-center">
              <div
                className="rounded-full bg-[#4FC3F7]"
                style={{ width: "30px", height: "30px" }}
              />
              <span className="font-mono text-[9px] text-[var(--text-secondary)] mt-1">Earth</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="rounded-full"
                style={{
                  width: `${Math.min(Math.max(30 * radius, 10), 80)}px`,
                  height: `${Math.min(Math.max(30 * radius, 10), 80)}px`,
                  backgroundColor: planetType.color,
                }}
              />
              <span className="font-mono text-[9px] text-[var(--text-secondary)] mt-1">Predicted</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "HABITABILITY",
      icon: "🌱",
      content: (
        <div>
          <p className="font-orbitron text-lg" style={{ color: hab.color }}>
            {hab.label}
          </p>
          <p className="font-exo text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
            {hab.label === "Potentially Habitable"
              ? "This planet falls within parameters that could support liquid water."
              : hab.label === "Marginal"
              ? "Some conditions may support extremophile life forms."
              : "Current parameters suggest conditions unfavorable for known life."}
          </p>
        </div>
      ),
    },
    {
      label: "PLANET TYPE",
      icon: "🪐",
      content: (
        <div>
          <p className="font-orbitron text-lg" style={{ color: planetType.color }}>
            {planetType.label}
          </p>
          <p className="font-exo text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
            {planetType.description || getTypeDescription(planetType.label)}
          </p>
        </div>
      ),
    },
    {
      label: "STELLAR TEMPERATURE",
      icon: "🌡️",
      content: (
        <div>
          <p className="font-orbitron text-xl text-[#ff9800]">
            {inputs.koi_steff} K
          </p>
          <p className="font-mono text-xs text-[var(--text-mono)] mt-1">
            ≈ {tempC}°C (host star surface)
          </p>
          <p className="font-exo text-xs text-[var(--text-secondary)] mt-2">
            {tempK > 6000 ? "Hot star — higher UV radiation" : tempK > 4000 ? "Sun-like temperature range" : "Cool star — potential for close-orbit habitable zones"}
          </p>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl bg-[var(--bg-card)] border border-[var(--border-glow)] shadow-[var(--glow-lg)] p-6"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <p className="font-mono text-xs text-[var(--accent-cyan)] tracking-[0.3em] mb-1">
            [ PLANETARY DATA ]
          </p>
          <h2 className="font-orbitron text-xl font-bold">
            Planet Information
          </h2>
        </div>

        {/* Detail cards */}
        <div className="flex flex-col gap-4">
          {details.map((detail, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{detail.icon}</span>
                <span className="font-mono text-[10px] text-[var(--text-secondary)] tracking-widest uppercase">
                  {detail.label}
                </span>
              </div>
              {detail.content}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function getTypeDescription(label) {
  const desc = {
    "Sub-Earth": "Smaller than Earth — rocky body with thin or no atmosphere.",
    "Earth-like": "Similar in size to Earth — could have solid surface and atmosphere.",
    "Super-Earth": "Larger than Earth but smaller than Neptune — may be rocky or have thick atmosphere.",
    "Mini-Neptune": "Between Earth and Neptune — likely has a significant gaseous envelope.",
    "Neptune-like": "Similar to Neptune — ice giant with deep atmosphere.",
    "Sub-Jupiter": "Smaller than Jupiter — gas-rich planet with massive atmosphere.",
    "Jupiter-like": "Similar to Jupiter — gas giant with no solid surface.",
    "Super-Jupiter": "Larger than Jupiter — extreme gas giant with intense gravity.",
  };
  return desc[label] || "A distant world awaiting further characterization.";
}
