/** MissionBriefSection — Section 2: context explanation + SVG data flow wheel. */
import { motion } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import StatBadge from "../ui/StatBadge";
import DataFlowWheel from "../ui/DataFlowWheel";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function MissionBriefSection() {
  return (
    <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left column */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col gap-6"
      >
        <SectionLabel text="MISSION_BRIEF" />

        <motion.h2
          variants={item}
          className="font-orbitron text-2xl md:text-3xl font-bold"
        >
          The Challenge of False Signals
        </motion.h2>

        <motion.p variants={item} className="font-exo text-[var(--text-secondary)] leading-relaxed">
          The Kepler Space Telescope identified thousands of potential planetary
          signals — Kepler Objects of Interest (KOIs). However, many of these
          signals are false positives caused by eclipsing binary stars,
          instrumental artifacts, or stellar noise.
        </motion.p>

        <motion.p variants={item} className="font-exo text-[var(--text-secondary)] leading-relaxed">
          Our system uses two machine learning models to analyze these signals:
          one to classify whether the signal represents a genuine exoplanet, and
          another to predict the planet's physical radius if confirmed.
        </motion.p>

        {/* Stat badges */}
        <div className="flex flex-wrap gap-3">
          <StatBadge text="9,500+ KOIs ANALYZED" delay={0} />
          <StatBadge text="2 ML MODELS ACTIVE" delay={0.15} />
          <StatBadge text="REAL-TIME INFERENCE" delay={0.3} />
        </div>

        {/* Task cards */}
        <div className="flex flex-col gap-3 mt-2">
          <motion.div
            variants={item}
            className="p-4 rounded-lg bg-[var(--bg-card)] border-l-4 border-[var(--accent-cyan)]"
          >
            <h3 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-1">
              TASK A — Classification
            </h3>
            <p className="font-exo text-xs text-[var(--text-secondary)]">
              Confirmed Exoplanet vs False Positive · Metrics: F1-Score · ROC-AUC
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="p-4 rounded-lg bg-[var(--bg-card)] border-l-4 border-[var(--accent-violet)]"
          >
            <h3 className="font-orbitron text-sm text-[var(--accent-violet)] mb-1">
              TASK B — Regression
            </h3>
            <p className="font-exo text-xs text-[var(--text-secondary)]">
              Planetary Radius Prediction · Metrics: RMSE · MAE
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right column — Data Flow Wheel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <DataFlowWheel />
      </motion.div>
    </div>
  );
}
