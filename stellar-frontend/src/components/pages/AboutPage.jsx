/** AboutPage — Insight on what Stellar Analytics is and how it works. */
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function AboutPage({ onBack }) {
  return (
    <div className="fixed inset-0 bg-[var(--bg-primary)] overflow-y-auto">
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1 + Math.random() * 1.5}px`,
              height: `${1 + Math.random() * 1.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--accent-cyan)] font-mono text-sm mb-8 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={16} /> BACK TO HUB
        </motion.button>

        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-8">
          {/* Header */}
          <motion.div variants={item}>
            <p className="font-mono text-xs text-[var(--accent-cyan)] tracking-[0.3em] mb-2">
              [ ABOUT · MISSION OVERVIEW ]
            </p>
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold">
              What is Stellar Analytics?
            </h1>
          </motion.div>

          {/* Overview */}
          <motion.div variants={item} className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h2 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-3">MISSION OVERVIEW</h2>
            <p className="font-exo text-[var(--text-secondary)] leading-relaxed">
              Stellar Analytics is an advanced exoplanet verification system powered by machine learning.
              It analyzes Kepler Objects of Interest (KOIs) — potential planetary signals detected by
              the Kepler Space Telescope — to determine whether they represent genuine exoplanets or
              false positives caused by stellar noise, eclipsing binaries, or instrumental artifacts.
            </p>
          </motion.div>

          {/* How it works */}
          <motion.div variants={item} className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h2 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-3">HOW IT WORKS</h2>
            <div className="flex flex-col gap-4">
              {[
                { step: "01", title: "Signal Input", desc: "You provide 11 transit parameters from Kepler observations — orbital period, transit depth, stellar properties, and more." },
                { step: "02", title: "Classification", desc: "Our ensemble ML model classifies the signal as CONFIRMED (real exoplanet) or FALSE POSITIVE, trained on 9,500+ verified KOIs." },
                { step: "03", title: "Radius Prediction", desc: "A regression model predicts the planet's physical radius in Earth radii (R⊕), giving a sense of the planet's size." },
                { step: "04", title: "Visualization", desc: "Results are visualized — 3D planet comparison with Earth, habitability assessment, size classification, and contextual data." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 items-start">
                  <span className="font-orbitron text-lg text-[var(--accent-violet)] opacity-60 mt-0.5">{s.step}</span>
                  <div>
                    <h3 className="font-orbitron text-sm text-[var(--text-primary)] mb-1">{s.title}</h3>
                    <p className="font-exo text-xs text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Key stats */}
          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "9,500+", label: "KOIs Analyzed" },
              { value: "2", label: "ML Models" },
              { value: "11", label: "Input Parameters" },
              { value: "Real-time", label: "Inference" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center">
                <p className="font-orbitron text-xl text-[var(--accent-cyan)]">{stat.value}</p>
                <p className="font-exo text-xs text-[var(--text-secondary)] mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Kepler mission background */}
          <motion.div variants={item} className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h2 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-3">THE KEPLER LEGACY</h2>
            <p className="font-exo text-[var(--text-secondary)] leading-relaxed">
              NASA's Kepler Space Telescope operated from 2009 to 2018, monitoring over 150,000 stars
              for tiny dips in brightness caused by orbiting planets. It discovered over 2,600 confirmed
              exoplanets and produced a catalog of thousands of Kepler Objects of Interest (KOIs). However,
              many signals turned out to be false positives — our system helps separate the real discoveries
              from the noise, continuing Kepler's legacy of cosmic discovery.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
