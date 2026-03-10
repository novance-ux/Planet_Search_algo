/** ModelComparisons — Modal showing how different ML models performed on this prediction. */
import { motion } from "framer-motion";
import { X } from "lucide-react";

/* Backend returns display names as keys, e.g. "Random Forest": 87.23 (probability %)
   clf_breakdown values = confidence % (0–100), reg_breakdown values = predicted radius */
const CLASSIFIERS = [
  "Random Forest",
  "Gradient Boosting",
  "LightGBM",
  "SVM",
  "KNN",
  "Logistic Regression",
  "Neural Network (MLP)",
  "Voting Ensemble",
];

const REGRESSORS = [
  "Random Forest",
  "Gradient Boosting",
  "LightGBM",
  "Ridge Regression",
  "Lasso Regression",
  "Linear Regression",
  "KNN Regressor",
  "Neural Network (MLP)",
];

export default function ModelComparisons({ result, onClose }) {
  const clfBreakdown = result?.clf_breakdown || result?.raw?.clf_breakdown || {};
  const regBreakdown = result?.reg_breakdown || result?.raw?.reg_breakdown || {};
  const hasClfData = Object.keys(clfBreakdown).length > 0;
  const hasRegData = Object.keys(regBreakdown).length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-xl bg-[var(--bg-card)] border border-[var(--border-glow)] shadow-[var(--glow-lg)] p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <p className="font-mono text-xs text-[var(--accent-violet)] tracking-[0.3em] mb-1">
            [ MODEL PERFORMANCE ]
          </p>
          <h2 className="font-orbitron text-xl font-bold">
            Model Comparisons
          </h2>
          <p className="font-exo text-xs text-[var(--text-secondary)] mt-1">
            How each ML model classified and predicted for your signal
          </p>
        </div>

        {/* Classification Models */}
        <div className="mb-6">
          <h3 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[var(--accent-cyan)] rounded-full" />
            CLASSIFICATION MODELS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CLASSIFIERS.map((name, i) => {
              const prob = hasClfData ? clfBreakdown[name] : null;
              const prediction = prob != null
                ? (prob >= 50 ? "CONFIRMED" : "FALSE POSITIVE")
                : "—";
              const confidence = prob != null ? prob / 100 : null;

              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-[var(--text-primary)]">
                      {name}
                    </span>
                    <span
                      className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        color:
                          prediction === "CONFIRMED"
                            ? "var(--confirmed)"
                            : prediction === "FALSE POSITIVE"
                            ? "var(--false-positive)"
                            : "var(--text-secondary)",
                        backgroundColor:
                          prediction === "CONFIRMED"
                            ? "rgba(0,255,136,0.1)"
                            : prediction === "FALSE POSITIVE"
                            ? "rgba(255,68,102,0.1)"
                            : "transparent",
                        border: "1px solid currentColor",
                        borderColor:
                          prediction === "CONFIRMED"
                            ? "rgba(0,255,136,0.3)"
                            : prediction === "FALSE POSITIVE"
                            ? "rgba(255,68,102,0.3)"
                            : "var(--border-subtle)",
                      }}
                    >
                      {prediction}
                    </span>
                  </div>
                  {confidence != null && (
                    <div className="mt-1">
                      <div className="w-full h-1 rounded-full bg-[var(--bg-primary)]">
                        <div
                          className="h-full rounded-full bg-[var(--accent-cyan)]"
                          style={{ width: `${Math.min(confidence * 100, 100)}%` }}
                        />
                      </div>
                      <span className="font-mono text-[9px] text-[var(--text-mono)] opacity-60">
                        {(confidence * 100).toFixed(1)}% confidence
                      </span>
                    </div>
                  )}
                  {!hasClfData && (
                    <p className="font-mono text-[9px] text-[var(--text-secondary)] opacity-40 mt-1">
                      Breakdown not available
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Regression Models */}
        <div>
          <h3 className="font-orbitron text-sm text-[var(--accent-violet)] mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[var(--accent-violet)] rounded-full" />
            REGRESSION MODELS (Radius Prediction)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {REGRESSORS.map((name, i) => {
              const radius = hasRegData ? regBreakdown[name] : null;

              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--text-primary)]">
                      {name}
                    </span>
                    <span className="font-mono text-xs text-[var(--accent-gold)]">
                      {radius != null ? `${Number(radius).toFixed(3)} R⊕` : "—"}
                    </span>
                  </div>
                  {!hasRegData && (
                    <p className="font-mono text-[9px] text-[var(--text-secondary)] opacity-40 mt-1">
                      Breakdown not available
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
          <p className="font-exo text-xs text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)]">Note:</strong> The final prediction uses a Voting Ensemble
            that combines all classification models. If individual model breakdowns are not available from the API,
            the overall ensemble result is shown above in the results header.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
