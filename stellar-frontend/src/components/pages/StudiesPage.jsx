/** StudiesPage — Research and studies done on exoplanet detection. */
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const STUDIES = [
  {
    title: "Transit Photometry Method",
    field: "Detection Technique",
    summary: "The primary method used by Kepler — detecting periodic dips in stellar brightness as planets cross in front of their host stars. Our classification model is trained on these transit signals.",
    year: "2009–2018",
    color: "var(--accent-cyan)",
  },
  {
    title: "Machine Learning in Exoplanet Validation",
    field: "ML Application",
    summary: "Recent advances apply ensemble methods (Random Forest, Gradient Boosting, LightGBM) and neural networks to classify KOIs, achieving >90% accuracy in distinguishing real planets from false positives.",
    year: "2015–present",
    color: "var(--accent-violet)",
  },
  {
    title: "Planetary Radius Estimation",
    field: "Regression Analysis",
    summary: "Using transit depth (planet/star radius ratio), stellar radius, and other parameters to predict a planet's physical size. Ridge, Lasso, and ensemble regressors show strong performance on Kepler data.",
    year: "2014–present",
    color: "var(--accent-gold)",
  },
  {
    title: "False Positive Identification",
    field: "Signal Processing",
    summary: "Eclipsing binaries, background stars, and instrumental systematics can mimic planetary transits. Studies show up to 40% of initial KOIs were false positives, making automated classification essential.",
    year: "2012–present",
    color: "var(--confirmed)",
  },
  {
    title: "Habitability Zone Analysis",
    field: "Astrobiology",
    summary: "Research to determine which confirmed exoplanets fall within their star's habitable zone — the orbital distance where liquid water could exist. Combines stellar temperature, planetary radius, and orbital period.",
    year: "2013–present",
    color: "#ff9800",
  },
  {
    title: "Ensemble Model Approaches",
    field: "Model Architecture",
    summary: "Our system employs a Voting Ensemble combining multiple classifiers — KNN, SVM, Random Forest, Gradient Boosting, LightGBM, Logistic Regression, and Neural Networks — for robust predictions.",
    year: "2020–present",
    color: "var(--accent-cyan)",
  },
];

export default function StudiesPage({ onBack }) {
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

        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
          <motion.div variants={item}>
            <p className="font-mono text-xs text-[var(--accent-cyan)] tracking-[0.3em] mb-2">
              [ RESEARCH · STUDIES ]
            </p>
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold">
              Studies & Research
            </h1>
            <p className="font-exo text-sm text-[var(--text-secondary)] mt-2">
              Key research areas underpinning our exoplanet verification system
            </p>
          </motion.div>

          {/* Study cards */}
          {STUDIES.map((study, i) => (
            <motion.div
              key={i}
              variants={item}
              className="p-6 rounded-xl bg-[var(--bg-card)] border-l-4 border border-[var(--border-subtle)]"
              style={{ borderLeftColor: study.color }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="font-orbitron text-sm" style={{ color: study.color }}>
                    {study.title}
                  </h2>
                  <span className="font-mono text-[10px] text-[var(--text-secondary)] opacity-60">
                    {study.field}
                  </span>
                </div>
                <span className="font-mono text-xs text-[var(--text-mono)] opacity-50 whitespace-nowrap">
                  {study.year}
                </span>
              </div>
              <p className="font-exo text-sm text-[var(--text-secondary)] leading-relaxed">
                {study.summary}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
