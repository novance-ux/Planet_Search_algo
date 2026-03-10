/** SearchPage — The main search portal: 11 inputs → transition → Earth + Planet results. */
import { useState, useCallback, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import InputFormSection from "../sections/InputFormSection";
import { usePrediction } from "../../hooks/usePrediction";
import { useFormValidation } from "../../hooks/useFormValidation";
import { DEMO_SIGNAL } from "../../constants/demoSignal";
import RadarLoader from "../ui/RadarLoader";
import SearchResultsView from "./SearchResultsView";

export default function SearchPage({ onBack }) {
  const {
    values,
    errors,
    setValue,
    setAllValues,
    validateAll,
    isFieldValid,
    isFieldInvalid,
  } = useFormValidation();

  const { predict, status, result, error: apiError } = usePrediction();

  const [showRadar, setShowRadar] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [lastInputs, setLastInputs] = useState(null);
  const [toast, setToast] = useState(null);

  const handleLoadDemo = useCallback(() => {
    const stringified = {};
    for (const [k, v] of Object.entries(DEMO_SIGNAL)) {
      stringified[k] = String(v);
    }
    setAllValues(stringified);
    setToast("Demo signal loaded — Kepler-22b analogue");
    setTimeout(() => setToast(null), 3000);
  }, [setAllValues]);

  const handleSubmit = useCallback(async () => {
    if (!validateAll()) {
      setToast("Invalid parameters detected");
      setTimeout(() => setToast(null), 3000);
      return;
    }

    const numericData = {};
    for (const [k, v] of Object.entries(values)) {
      if (v === "" || v === null || v === undefined) continue;
      numericData[k] = Number(v);
    }

    setLastInputs(values);
    setShowRadar(true);

    const minDelay = new Promise((r) => setTimeout(r, 1500));

    try {
      await Promise.all([predict(numericData), minDelay]);
      setShowRadar(false);
      /* Show Earth-first transition */
      setShowTransition(true);
    } catch {
      setShowRadar(false);
      setToast(apiError || "Prediction failed");
      setTimeout(() => setToast(null), 3000);
    }
  }, [values, validateAll, predict, apiError]);

  /* After transition completes, show full results */
  const handleTransitionComplete = useCallback(() => {
    setShowTransition(false);
    setShowResults(true);
  }, []);

  /* Go back to input form from results */
  const handleBackToForm = useCallback(() => {
    setShowResults(false);
  }, []);

  return (
    <div className="fixed inset-0 bg-[var(--bg-primary)] overflow-y-auto">
      {/* Background stars */}
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

      {/* Radar loader overlay */}
      {showRadar && <RadarLoader />}

      {/* Earth-first transition */}
      <AnimatePresence>
        {showTransition && (
          <EarthFirstTransition onComplete={handleTransitionComplete} />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-glow)] font-mono text-xs text-[var(--accent-cyan)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {!showResults ? (
          /* Input form view */
          <div className="max-w-[1280px] mx-auto px-6 py-12">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onBack}
              className="flex items-center gap-2 text-[var(--accent-cyan)] font-mono text-sm mb-8 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft size={16} /> BACK TO HUB
            </motion.button>

            <InputFormSection
              values={values}
              errors={errors}
              isFieldValid={isFieldValid}
              isFieldInvalid={isFieldInvalid}
              onFieldChange={setValue}
              onLoadDemo={handleLoadDemo}
              onSubmit={handleSubmit}
              isLoading={status === "loading"}
            />
          </div>
        ) : (
          /* Results view */
          <SearchResultsView
            result={result}
            inputs={lastInputs || values}
            onBack={handleBackToForm}
            onBackToHub={onBack}
          />
        )}
      </div>
    </div>
  );
}

/** EarthFirstTransition — Shows Earth first, then reveals the predicted planet with distance & radius comparison. */
function EarthFirstTransition({ onComplete }) {
  const [phase, setPhase] = useState(1);

  // Phase 1: Earth appears (0-1.2s)
  // Phase 2: Planet appears beside it (1.2-2.5s)
  // Phase 3: Distance/radius labels appear (2.5-3.5s)
  // Complete at 4s
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 1200);
    const t2 = setTimeout(() => setPhase(3), 2500);
    const t3 = setTimeout(() => onComplete(), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-[#010510] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stars */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${1 + Math.random() * 1.5}px`,
            height: `${1 + Math.random() * 1.5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5,
          }}
        />
      ))}

      {/* Earth */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="relative"
        style={{ marginRight: phase >= 2 ? "80px" : "0px", transition: "margin 0.8s ease" }}
      >
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full relative overflow-hidden shadow-[0_0_40px_rgba(60,150,255,0.4)]"
          style={{ background: "linear-gradient(135deg, #1565c0, #0d47a1, #004d40, #1b5e20)" }}
        >
          <div className="absolute top-[15%] left-[20%] w-8 h-6 rounded-full bg-green-600/40" />
          <div className="absolute top-[45%] left-[45%] w-10 h-5 rounded-full bg-green-700/30" />
          <div className="absolute top-[25%] right-[15%] w-5 h-8 rounded-full bg-green-600/35" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/15 via-transparent to-transparent" />
        </div>
        <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-[#4FC3F7] whitespace-nowrap">
          EARTH
        </p>
      </motion.div>

      {/* Predicted Planet */}
      {phase >= 2 && (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: -40 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
          className="relative"
          style={{ marginLeft: "80px" }}
        >
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full relative overflow-hidden shadow-[0_0_40px_rgba(0,212,255,0.3)]"
            style={{ background: "linear-gradient(135deg, #e65100, #bf360c, #4e342e)" }}
          >
            <div className="absolute top-[30%] left-[25%] w-6 h-4 rounded-full bg-orange-300/20" />
            <div className="absolute top-[50%] left-[50%] w-8 h-3 rounded-full bg-amber-400/15" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          </div>
          <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-[var(--accent-cyan)] whitespace-nowrap">
            PREDICTED
          </p>
        </motion.div>
      )}

      {/* Distance indicator */}
      {phase >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-[25%] flex flex-col items-center"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-[var(--accent-cyan)] opacity-50" />
            <span className="font-mono text-xs text-[var(--accent-cyan)]">COMPARING</span>
            <div className="w-16 h-px bg-[var(--accent-cyan)] opacity-50" />
          </div>
          <p className="font-exo text-xs text-[var(--text-secondary)] mt-2">
            Analyzing radius &amp; distance...
          </p>
        </motion.div>
      )}

      {/* Phase label */}
      <motion.p
        className="absolute top-12 font-mono text-xs text-[var(--accent-cyan)] tracking-[0.3em]"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {phase === 1 && "VISUALIZING EARTH..."}
        {phase === 2 && "GENERATING PLANET FROM INPUTS..."}
        {phase === 3 && "CALCULATING COMPARISONS..."}
      </motion.p>
    </motion.div>
  );
}
