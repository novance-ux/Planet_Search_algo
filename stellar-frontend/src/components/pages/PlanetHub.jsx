/** PlanetHub — Rotating planet with orbital menu items (About, Studies, News, Creators, Search). */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MENU_ITEMS = [
  { id: "about", label: "About", icon: "🔭", angle: -90 },
  { id: "studies", label: "Studies", icon: "📊", angle: -30 },
  { id: "news", label: "News", icon: "📡", angle: 30 },
  { id: "creators", label: "Creators", icon: "👥", angle: 90 },
  { id: "search", label: "Search", icon: "🔍", angle: 150 },
];

function OrbitingItem({ item, onSelect, orbitRadius }) {
  const rad = (item.angle * Math.PI) / 180;
  const x = Math.cos(rad) * orbitRadius;
  const y = Math.sin(rad) * orbitRadius;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + Math.abs(item.angle) * 0.002, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(item.id)}
      className="absolute flex flex-col items-center gap-2 cursor-pointer group"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[rgba(10,22,40,0.9)] border border-[var(--border-glow)] flex items-center justify-center text-xl shadow-[var(--glow-sm)] group-hover:shadow-[var(--glow-md)] group-hover:border-[var(--accent-cyan)] transition-all duration-300">
        {item.icon}
      </div>
      <span className="font-mono text-[10px] md:text-xs text-[var(--accent-cyan)] tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
        {item.label}
      </span>
    </motion.button>
  );
}

export default function PlanetHub({ userName, onNavigate }) {
  const containerRef = useRef(null);
  const [orbitRadius, setOrbitRadius] = useState(180);
  const [rotation, setRotation] = useState(0);

  /* Responsive orbit radius */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setOrbitRadius(w < 640 ? 130 : w < 1024 ? 180 : 220);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Slow auto-rotation of the planet */
  useEffect(() => {
    let frame;
    const animate = () => {
      setRotation((r) => r + 0.15);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="fixed inset-0 bg-[var(--bg-primary)] overflow-hidden flex items-center justify-center">
      {/* Background stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1 + Math.random() * 1.5}px`,
              height: `${1 + Math.random() * 1.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Welcome text at top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute top-8 md:top-12 text-center z-10"
      >
        <p className="font-mono text-xs text-[var(--accent-cyan)] tracking-[0.3em] mb-1">
          [ STELLAR ANALYTICS ]
        </p>
        <h1 className="font-orbitron text-lg md:text-xl text-[var(--text-primary)]">
          Welcome, <span className="text-[var(--accent-cyan)]">{userName}</span>
        </h1>
        <p className="font-exo text-xs text-[var(--text-secondary)] mt-2 italic">
          Select a destination — scroll through the cosmos
        </p>
      </motion.div>

      {/* Central planet */}
      <div ref={containerRef} className="relative" style={{ width: orbitRadius * 2 + 120, height: orbitRadius * 2 + 120 }}>
        {/* Orbit ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border-subtle)]"
          style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border-subtle)] opacity-40"
          style={{ width: orbitRadius * 2 + 40, height: orbitRadius * 2 + 40 }}
        />

        {/* Rotating planet */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        >
          <div
            className="w-28 h-28 md:w-36 md:h-36 rounded-full relative overflow-hidden shadow-[0_0_50px_rgba(0,212,255,0.3)]"
            style={{
              background: "linear-gradient(135deg, #0e4d92, #1a237e, #0d47a1, #004d40)",
            }}
          >
            {/* Rotating surface features */}
            <div
              className="absolute inset-0"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className="absolute top-[15%] left-[20%] w-10 h-7 rounded-full bg-green-700/30" />
              <div className="absolute top-[40%] left-[50%] w-14 h-8 rounded-full bg-teal-600/25" />
              <div className="absolute top-[65%] left-[10%] w-8 h-10 rounded-full bg-emerald-700/20" />
              <div className="absolute top-[20%] right-[10%] w-6 h-12 rounded-full bg-green-800/25" />
            </div>
            {/* Atmosphere glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          </div>

          {/* Planet label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[var(--accent-cyan)] tracking-[0.2em] whitespace-nowrap"
          >
            EXPLORE THE COSMOS
          </motion.p>
        </motion.div>

        {/* Orbiting menu items */}
        {MENU_ITEMS.map((item) => (
          <OrbitingItem
            key={item.id}
            item={item}
            onSelect={onNavigate}
            orbitRadius={orbitRadius}
          />
        ))}
      </div>

      {/* Bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 font-exo text-xs text-[var(--text-secondary)] opacity-40"
      >
        Click any destination to explore
      </motion.p>
    </div>
  );
}
