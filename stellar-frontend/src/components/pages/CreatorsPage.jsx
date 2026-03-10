/** CreatorsPage — Info on the team behind Stellar Analytics. */
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const CREATORS = [
  {
    name: "Stellar Analytics Team",
    role: "Development & Research",
    avatar: "🚀",
    desc: "Building the next generation of exoplanet verification tools using machine learning and data science.",
  },
  {
    name: "ML Engineers",
    role: "Model Training & Optimization",
    avatar: "🧠",
    desc: "Training ensemble classifiers and regression models on Kepler mission data to achieve high-accuracy predictions.",
  },
  {
    name: "Frontend Team",
    role: "UI/UX & Visualization",
    avatar: "🎨",
    desc: "Designing an immersive space-themed interface with 3D planet visualization, interactive charts, and cinematic transitions.",
  },
  {
    name: "Data Scientists",
    role: "Data Analysis & EDA",
    avatar: "📊",
    desc: "Performing exploratory data analysis on the Kepler cumulative dataset, feature engineering, and model evaluation.",
  },
];

export default function CreatorsPage({ onBack }) {
  return (
    <div className="fixed inset-0 bg-[var(--bg-primary)] overflow-y-auto">
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1 + Math.random() * 1.5}px`,
              height: `${1 + Math.random() * 1.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--accent-cyan)] font-mono text-sm mb-8 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={16} /> BACK TO HUB
        </motion.button>

        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-8">
          <motion.div variants={item}>
            <p className="font-mono text-xs text-[var(--accent-cyan)] tracking-[0.3em] mb-2">
              [ CREW · THE CREATORS ]
            </p>
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold">
              Meet the Team
            </h1>
            <p className="font-exo text-sm text-[var(--text-secondary)] mt-2">
              The minds behind the Stellar Analytics exoplanet verification system
            </p>
          </motion.div>

          {/* Creator cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CREATORS.map((creator, i) => (
              <motion.div
                key={i}
                variants={item}
                className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-glow)] transition-colors duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-glow)] flex items-center justify-center text-2xl shadow-[var(--glow-sm)]">
                    {creator.avatar}
                  </div>
                  <div>
                    <h2 className="font-orbitron text-sm text-[var(--text-primary)]">
                      {creator.name}
                    </h2>
                    <p className="font-mono text-[10px] text-[var(--accent-cyan)] tracking-widest uppercase">
                      {creator.role}
                    </p>
                  </div>
                </div>
                <p className="font-exo text-sm text-[var(--text-secondary)] leading-relaxed">
                  {creator.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Project info */}
          <motion.div variants={item} className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h2 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-3">ABOUT THE PROJECT</h2>
            <p className="font-exo text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              Stellar Analytics was developed as part of TECHNEX '26 — a technical event
              focused on pushing the boundaries of data science and machine learning applications.
              The system combines a Flask backend with a React frontend to deliver real-time
              exoplanet verification through an immersive, space-themed interface.
            </p>
            <div className="flex flex-wrap gap-3">
              {["React", "Flask", "Three.js", "Framer Motion", "Tailwind CSS", "Scikit-learn", "LightGBM"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full border border-[var(--border-subtle)] font-mono text-[10px] text-[var(--text-mono)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
