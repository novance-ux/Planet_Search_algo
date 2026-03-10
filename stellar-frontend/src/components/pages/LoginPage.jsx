/** LoginPage — Landing screen with telescope observer, starry sky, planets, and login form. */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage({ onLogin }) {
  const [name, setName] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsLoggingIn(true);
    setTimeout(() => onLogin(name.trim()), 600);
  };

  return (
    <div className="fixed inset-0 bg-[#010510] overflow-hidden flex items-center justify-center">
      {/* Starry sky */}
      <div className="absolute inset-0">
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              opacity: 0.1 + Math.random() * 0.8,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Planets in the sky */}
      <motion.div
        className="absolute"
        style={{ top: "8%", right: "12%" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-700 to-orange-500 shadow-[0_0_30px_rgba(255,165,0,0.3)]" />
        {/* Ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-6 border border-amber-400/30 rounded-[50%]"
          style={{ transform: "translate(-50%, -50%) rotateX(70deg)" }}
        />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: "15%", left: "8%" }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-800 to-red-500 shadow-[0_0_20px_rgba(255,0,0,0.2)]" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: "22%", left: "35%" }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-300 to-cyan-500 shadow-[0_0_15px_rgba(0,212,255,0.3)]" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: "5%", left: "60%" }}
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-700 to-emerald-400 shadow-[0_0_18px_rgba(0,255,100,0.2)]" />
      </motion.div>

      {/* Ground / horizon */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#0a0e1a] via-[#0d1225] to-transparent" />

      {/* Hilltop silhouette */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        style={{ height: "20vh" }}
      >
        <path
          d="M0,200 L0,120 Q200,60 400,100 Q600,140 720,80 Q840,20 960,70 Q1100,130 1200,90 Q1350,40 1440,80 L1440,200 Z"
          fill="#0a0e1a"
        />
      </svg>

      {/* Telescope + person silhouette */}
      <div className="absolute bottom-[12vh] left-1/2 -translate-x-1/2 md:left-[30%]">
        <svg width="180" height="220" viewBox="0 0 180 220" className="drop-shadow-2xl">
          {/* Person body silhouette */}
          <ellipse cx="70" cy="40" rx="14" ry="16" fill="#0d1225" />
          <rect x="60" y="55" width="20" height="50" rx="5" fill="#0d1225" />
          {/* Left arm reaching to telescope */}
          <path d="M60,65 Q40,55 30,50" stroke="#0d1225" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Right arm */}
          <path d="M80,70 Q95,80 90,95" stroke="#0d1225" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Legs */}
          <path d="M65,105 L55,160" stroke="#0d1225" strokeWidth="9" strokeLinecap="round" />
          <path d="M75,105 L85,160" stroke="#0d1225" strokeWidth="9" strokeLinecap="round" />
          
          {/* Telescope */}
          <g transform="translate(10, 20)">
            {/* Tripod */}
            <line x1="20" y1="90" x2="0" y2="170" stroke="#1a2040" strokeWidth="3" />
            <line x1="20" y1="90" x2="40" y2="170" stroke="#1a2040" strokeWidth="3" />
            <line x1="20" y1="90" x2="20" y2="175" stroke="#1a2040" strokeWidth="3" />
            {/* Tube */}
            <rect x="5" y="30" width="30" height="65" rx="4" fill="#1a2040" />
            {/* Objective lens */}
            <ellipse cx="20" cy="28" rx="18" ry="6" fill="#0e1630" stroke="var(--accent-cyan)" strokeWidth="1" opacity="0.6" />
            {/* Eyepiece */}
            <rect x="12" y="95" width="16" height="10" rx="2" fill="#1a2040" />
            {/* Lens glow */}
            <motion.ellipse
              cx="20" cy="28" rx="12" ry="4"
              fill="var(--accent-cyan)"
              opacity={0.15}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </g>
        </svg>
      </div>

      {/* Login form */}
      <AnimatePresence>
        {!isLoggingIn && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 flex flex-col items-center gap-6 px-6"
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-orbitron text-2xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
                STELLAR ANALYTICS
              </h1>
              <p className="font-mono text-xs text-[var(--accent-cyan)] tracking-[0.3em]">
                EXOPLANET VERIFICATION SYSTEM
              </p>
            </motion.div>

            {/* Login card */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center gap-4 p-8 rounded-xl bg-[rgba(10,22,40,0.85)] backdrop-blur-md border border-[var(--border-glow)] shadow-[var(--glow-md)] w-[320px] md:w-[380px]"
            >
              <p className="font-exo text-sm text-[var(--text-secondary)]">
                Identify yourself, Explorer
              </p>
              <div className="input-border-animate w-full">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  maxLength={30}
                  className="w-full bg-[var(--bg-input)] border-b-2 border-[var(--border-subtle)] px-4 py-3 rounded-t-md font-mono text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] placeholder:opacity-40 outline-none"
                  autoFocus
                />
              </div>
              <motion.button
                type="submit"
                disabled={!name.trim()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full px-6 py-3 border border-[var(--accent-cyan)] bg-transparent text-[var(--accent-cyan)] font-orbitron text-sm tracking-[0.15em] uppercase rounded-lg hover:bg-[rgba(0,212,255,0.08)] hover:shadow-[var(--glow-md)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                BEGIN MISSION
              </motion.button>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="font-exo text-xs text-[var(--text-secondary)] opacity-50 italic"
            >
              "Embark on a journey of cosmic discovery"
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logging in flash */}
      <AnimatePresence>
        {isLoggingIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="w-3 h-3 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_30px_var(--accent-cyan)]"
            />
            <p className="font-mono text-xs text-[var(--accent-cyan)] tracking-[0.3em]">
              ACCESSING TELESCOPE...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
