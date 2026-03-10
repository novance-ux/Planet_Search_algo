/** HeroSection — Section 1: landing hero with animated text, telescope graphic, and CTA. */
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const WORDS = ["EMBARK", "ON", "A", "JOURNEY", "OF", "COSMIC", "DISCOVERY"];
const TAGLINE = "Separating worlds from illusions.";

export default function HeroSection({ onBeginMission }) {
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= TAGLINE.length) {
        setTagline(TAGLINE.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs text-[var(--accent-cyan)] tracking-[0.3em] uppercase"
      >
        [ TECHNEX '26 · STELLAR ANALYTICS ]
        <span className="typewriter-cursor" />
      </motion.div>

      {/* Main heading */}
      <h1 className="font-orbitron text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
        {WORDS.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="inline-block mr-3"
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="font-exo text-base md:text-lg text-[var(--text-secondary)] max-w-2xl italic"
      >
        The year is 2236. You are part of the Stellar Verification Program.
        Separate truth from illusion across the cosmos.
      </motion.p>

      {/* Telescope lens graphic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative w-40 h-40 flex items-center justify-center"
      >
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border border-[var(--accent-cyan)]"
            style={{
              width: `${ring * 50}px`,
              height: `${ring * 50}px`,
              opacity: 0.2 + ring * 0.1,
              animation: `pulse-glow ${2 + ring * 0.5}s ease-in-out infinite`,
            }}
          />
        ))}
        <div className="w-4 h-4 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_20px_var(--accent-cyan)]" />
      </motion.div>

      {/* Typewriter tagline */}
      <p className="font-mono text-sm text-[var(--text-mono)] h-6">
        {tagline}
        <span className="typewriter-cursor" />
      </p>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={onBeginMission}
        className="px-8 py-3 border border-[var(--accent-cyan)] bg-transparent text-[var(--accent-cyan)] font-orbitron text-sm tracking-[0.15em] uppercase rounded-lg hover:bg-[rgba(0,212,255,0.08)] hover:shadow-[var(--glow-md)] transition-all duration-300"
      >
        BEGIN MISSION
      </motion.button>

      {/* Scroll chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{ animation: "bounce-down 2s ease-in-out infinite" }}
      >
        <ChevronDown size={24} className="text-[var(--accent-cyan)] opacity-50" />
      </motion.div>
    </div>
  );
}
