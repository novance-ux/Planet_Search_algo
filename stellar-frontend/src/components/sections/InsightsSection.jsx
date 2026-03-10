/** InsightsSection — Section 7: feature importance, confidence gauge, radius distribution. */
import { motion } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import FeatureImportanceChart from "../ui/FeatureImportanceChart";
import ConfidenceGauge from "../ui/ConfidenceGauge";
import RadiusDistributionChart from "../ui/RadiusDistributionChart";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function InsightsSection({ result }) {
  return (
    <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-8">
      <div>
        <SectionLabel text="SIGNAL_ANALYSIS · MODEL_INSIGHTS" />
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold">
          Data Insights & Analytics
        </h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Card 1 — Feature Importance */}
        <motion.div
          variants={item}
          className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]"
        >
          <h3 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-4">
            Feature Importance
          </h3>
          <FeatureImportanceChart />
        </motion.div>

        {/* Card 2 — Classification Gauge */}
        <motion.div
          variants={item}
          className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col items-center justify-center"
        >
          <h3 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-4">
            Classification Probability
          </h3>
          <ConfidenceGauge
            probability={result?.classification_probability ?? null}
          />
        </motion.div>

        {/* Card 3 — Radius Distribution */}
        <motion.div
          variants={item}
          className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]"
        >
          <h3 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-4">
            Radius Distribution
          </h3>
          <p className="text-xs font-exo text-[var(--text-secondary)] mb-2">
            Your prediction vs. known KOI population
          </p>
          <RadiusDistributionChart
            predictedRadius={result?.predicted_radius ?? null}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
