/** SearchResultsView — Post-search results: Earth + planet side-by-side, distance, radius difference.
 *  Clicking the planet reveals detailed info (size, habitability, type, temp, model comparisons). */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ClassificationBadge from "../ui/ClassificationBadge";
import ConfidenceBar from "../ui/ConfidenceBar";
import NumberCounter from "../ui/NumberCounter";
import { getPlanetType, getHabitability } from "../../utils/planetClassifier";
import PlanetDetailModal from "../ui/PlanetDetailModal";
import ModelComparisons from "../ui/ModelComparisons";
import PlanetVisual from "../ui/PlanetVisual";

export default function SearchResultsView({ result, inputs, onBack, onBackToHub }) {
  const [showPlanetDetail, setShowPlanetDetail] = useState(false);
  const [showModelComparisons, setShowModelComparisons] = useState(false);

  if (!result) return null;

  const isConfirmed = result.classification === "CONFIRMED";
  const radius = result.predicted_radius;
  const planetType = radius ? getPlanetType(radius, result.planet_type) : null;
  const habitability = radius
    ? getHabitability(radius, Number(inputs.koi_steff), Number(inputs.koi_period))
    : null;

  const earthRadius = 6371; // km
  const predictedKm = radius ? (radius * earthRadius).toFixed(0) : "—";
  const radiusDiff = radius ? Math.abs(radius - 1).toFixed(2) : "—";

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      {/* Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--accent-cyan)] font-mono text-sm hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={16} /> NEW SEARCH
        </motion.button>
        <span className="text-[var(--text-secondary)] opacity-30">|</span>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBackToHub}
          className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
        >
          BACK TO HUB
        </motion.button>
      </div>

      {/* Classification result header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <p className="font-mono text-xs text-[var(--accent-cyan)] tracking-[0.3em] mb-2">
          [ SIGNAL ANALYSIS · RESULTS ]
        </p>
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold mb-4">
          Analysis Complete
        </h1>
        <ClassificationBadge classification={result.classification} />
        <div className="mt-4 max-w-md mx-auto">
          <ConfidenceBar probability={result.classification_probability} />
        </div>
      </motion.div>

      {/* 3D Planet comparison — Earth & predicted planet */}
      {isConfirmed && radius > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <PlanetVisual
            predictedRadius={radius}
            backendType={result.planet_type}
            onClick={() => setShowPlanetDetail(true)}
          />
        </motion.div>
      )}

      {/* Distance and radius comparison cards */}
      {isConfirmed && radius > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <InfoCard
            label="Predicted Radius"
            value={<NumberCounter target={radius} decimals={2} suffix=" R⊕" />}
          />
          <InfoCard
            label="Radius Difference"
            value={
              <span className="font-mono text-[var(--accent-gold)]">
                {radius > 1 ? "+" : "−"}{radiusDiff} R⊕
              </span>
            }
          />
          <InfoCard
            label="Planet Type"
            value={
              <span style={{ color: planetType?.color }}>{planetType?.label}</span>
            }
          />
          <InfoCard
            label="Habitability"
            value={
              <span style={{ color: habitability?.color }}>{habitability?.label}</span>
            }
          />
        </motion.div>
      )}

      {/* Approximate distance & size in km */}
      {isConfirmed && radius > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-10"
        >
          <div className="px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-mono)]">
            EARTH: 6,371 km radius
          </div>
          <div className="px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-mono)]">
            PREDICTED: ~{Number(predictedKm).toLocaleString()} km radius
          </div>
          <div className="px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--accent-cyan)]">
            {radius >= 1 ? `${radius.toFixed(1)}× Earth` : `${(radius).toFixed(2)}× Earth`}
          </div>
        </motion.div>
      )}

      {/* False positive info */}
      {!isConfirmed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-[var(--bg-card)] border border-[rgba(255,68,102,0.2)] max-w-lg mx-auto mb-8"
        >
          <h3 className="font-orbitron text-sm text-[var(--false-positive)] mb-3">
            Signal Classified as False Positive
          </h3>
          <ul className="font-exo text-sm text-[var(--text-secondary)] space-y-1 list-disc list-inside">
            <li>Stellar noise or variability mimicking transit signal</li>
            <li>Background eclipsing binary contaminating flux</li>
            <li>Instrumental artifact or systematic detector error</li>
          </ul>
        </motion.div>
      )}

      {/* Click hint for planet + model comparisons button */}
      {isConfirmed && radius > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <p className="font-exo text-xs text-[var(--text-secondary)] italic">
            Click on the planet above to see detailed planetary information
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowModelComparisons(true)}
            className="px-6 py-3 border border-[var(--accent-violet)] bg-transparent text-[var(--accent-violet)] font-orbitron text-xs tracking-[0.15em] uppercase rounded-lg hover:bg-[rgba(123,47,255,0.08)] hover:shadow-[0_0_24px_rgba(123,47,255,0.25)] transition-all duration-300"
          >
            VIEW MODEL COMPARISONS
          </motion.button>
        </motion.div>
      )}

      {/* Planet detail modal */}
      <AnimatePresence>
        {showPlanetDetail && (
          <PlanetDetailModal
            result={result}
            inputs={inputs}
            onClose={() => setShowPlanetDetail(false)}
          />
        )}
      </AnimatePresence>

      {/* Model comparisons modal */}
      <AnimatePresence>
        {showModelComparisons && (
          <ModelComparisons
            result={result}
            onClose={() => setShowModelComparisons(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[rgba(10,22,40,0.75)] backdrop-blur-md text-center">
      <p className="text-xs font-exo text-[var(--text-secondary)] uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="text-lg font-orbitron">{value}</div>
    </div>
  );
}
