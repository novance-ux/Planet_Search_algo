/** ResultsSection — Section 5: classification badge, confidence bar, 3D planet scene, planet info. */
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import ClassificationBadge from "../ui/ClassificationBadge";
import ConfidenceBar from "../ui/ConfidenceBar";
import PlanetInfoCard from "../ui/PlanetInfoCard";

const PlanetScene = lazy(() => import("../ui/PlanetScene"));

export default function ResultsSection({ result, inputs }) {
  if (!result) return null;

  const isConfirmed = result.classification === "CONFIRMED";

  return (
    <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center gap-10">
      <div className="text-center">
        <SectionLabel text="SIGNAL_ANALYSIS · RESULTS" />
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold">
          Analysis Complete
        </h2>
      </div>

      {/* Zone A — Classification */}
      <ClassificationBadge classification={result.classification} />
      <ConfidenceBar probability={result.classification_probability} />

      {/* Metric pills */}
      <div className="flex flex-wrap gap-3 justify-center">
        {["F1-Score", "ROC-AUC", "Precision", "Recall"].map((m) => (
          <span
            key={m}
            className="px-3 py-1 rounded-full border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-mono)]"
          >
            {m}
          </span>
        ))}
      </div>

      {/* False positive info */}
      {!isConfirmed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl bg-[var(--bg-card)] border border-[rgba(255,68,102,0.2)] max-w-lg"
        >
          <h3 className="font-orbitron text-sm text-[var(--false-positive)] mb-3">
            Possible Causes
          </h3>
          <ul className="font-exo text-sm text-[var(--text-secondary)] space-y-1 list-disc list-inside">
            <li>Stellar noise or variability mimicking transit signal</li>
            <li>Background eclipsing binary contaminating flux measurements</li>
            <li>Instrumental artifact or systematic detector error</li>
          </ul>
        </motion.div>
      )}

      {/* Zone B — 3D Planet (only for confirmed) */}
      {isConfirmed && result.predicted_radius > 0 && (
        <div className="w-full">
          <Suspense
            fallback={
              <div className="w-full h-[300px] flex items-center justify-center font-mono text-sm text-[var(--text-secondary)]">
                Loading 3D scene...
              </div>
            }
          >
            <PlanetScene predictedRadius={result.predicted_radius} />
          </Suspense>
          <div className="mt-6">
            <PlanetInfoCard result={result} inputs={inputs} />
          </div>
        </div>
      )}
    </div>
  );
}
