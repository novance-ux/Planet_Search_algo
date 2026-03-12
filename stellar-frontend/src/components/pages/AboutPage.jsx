/** AboutPage — Info on the Kepler Space Telescope and its legacy. */
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
              [ ABOUT · THE KEPLER MISSION ]
            </p>
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold">
              The Kepler Space Telescope
            </h1>
          </motion.div>

          {/* Mission Overview */}
          <motion.div variants={item} className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h2 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-3">MISSION OVERVIEW</h2>
            <p className="font-exo text-[var(--text-secondary)] leading-relaxed">
              NASA's Kepler Space Telescope was a pioneering space observatory launched on March 7, 2009.
              Its primary mission was to survey a portion of our Milky Way galaxy to discover Earth-size
              and smaller planets in or near the habitable zone — the region around a star where liquid
              water could exist on a planet's surface. Named after the 17th-century German astronomer
              Johannes Kepler, it fundamentally transformed our understanding of planetary systems.
            </p>
          </motion.div>

          {/* How Transit Photometry Works */}
          <motion.div variants={item} className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h2 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-3">HOW IT WORKS — TRANSIT PHOTOMETRY</h2>
            <div className="flex flex-col gap-4">
              {[
                { step: "01", title: "Continuous Monitoring", desc: "Kepler stared at a single patch of sky containing over 150,000 stars simultaneously, measuring their brightness every 30 minutes for over 4 years." },
                { step: "02", title: "Detecting Dips", desc: "When a planet crosses in front of its host star (a transit), it blocks a tiny fraction of the star's light — typically 0.01% for an Earth-sized planet around a Sun-like star." },
                { step: "03", title: "Confirming Patterns", desc: "By observing repeated periodic dips, scientists confirm an orbiting planet. The depth of the dip reveals the planet's size, while the period reveals its orbital distance." },
                { step: "04", title: "Characterizing Worlds", desc: "Combined with stellar data, transit measurements allow scientists to estimate planetary radius, equilibrium temperature, and potential habitability." },
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
              { value: "2,681", label: "Confirmed Exoplanets" },
              { value: "150,000+", label: "Stars Monitored" },
              { value: "9.6 yrs", label: "Mission Duration" },
              { value: "530,506", label: "Stars Observed" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center">
                <p className="font-orbitron text-xl text-[var(--accent-cyan)]">{stat.value}</p>
                <p className="font-exo text-xs text-[var(--text-secondary)] mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Key Discoveries */}
          <motion.div variants={item} className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h2 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-3">KEY DISCOVERIES</h2>
            <ul className="font-exo text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              <li className="flex gap-2">
                <span className="text-[var(--accent-gold)]">★</span>
                <span><strong className="text-[var(--text-primary)]">Kepler-22b</strong> — The first planet found in the habitable zone of a Sun-like star, orbiting at a distance where liquid water could exist.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent-gold)]">★</span>
                <span><strong className="text-[var(--text-primary)]">Kepler-186f</strong> — The first Earth-sized planet discovered in the habitable zone of another star, a red dwarf smaller and cooler than our Sun.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent-gold)]">★</span>
                <span><strong className="text-[var(--text-primary)]">TRAPPIST-1 System</strong> — Kepler follow-ups helped confirm 7 rocky planets orbiting a single ultra-cool dwarf star, with 3 in the habitable zone.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent-gold)]">★</span>
                <span><strong className="text-[var(--text-primary)]">Statistical Revolution</strong> — Kepler data showed that planets are more common than stars in our galaxy — roughly 1 in 5 Sun-like stars hosts an Earth-sized planet in the habitable zone.</span>
              </li>
            </ul>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={item} className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h2 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-3">MISSION TIMELINE</h2>
            <div className="space-y-3">
              {[
                { year: "2009", event: "Kepler launches aboard a Delta II rocket from Cape Canaveral" },
                { year: "2010", event: "First five exoplanet discoveries confirmed (Kepler-4b through 8b)" },
                { year: "2011", event: "Kepler-22b confirmed — first habitable zone planet around a Sun-like star" },
                { year: "2013", event: "Second reaction wheel fails; primary mission ends. K2 extended mission begins" },
                { year: "2014", event: "Kepler-186f discovered — first Earth-sized planet in habitable zone" },
                { year: "2018", event: "Spacecraft runs out of fuel. Mission officially ends on October 30 after 9.6 years" },
              ].map((t) => (
                <div key={t.year} className="flex gap-4 items-start">
                  <span className="font-orbitron text-xs text-[var(--accent-orange)] min-w-[3rem]">{t.year}</span>
                  <p className="font-exo text-xs text-[var(--text-secondary)]">{t.event}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Legacy */}
          <motion.div variants={item} className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h2 className="font-orbitron text-sm text-[var(--accent-cyan)] mb-3">THE KEPLER LEGACY</h2>
            <p className="font-exo text-[var(--text-secondary)] leading-relaxed">
              Although Kepler's mission has ended, its data continues to yield new discoveries.
              The cumulative dataset of over 9,500 Kepler Objects of Interest (KOIs) remains one of
              the richest resources in exoplanet science. However, many signals turned out to be false
              positives — our Stellar Analytics system uses machine learning to separate real discoveries
              from noise, continuing Kepler's legacy by applying modern AI to its historic dataset.
              Kepler's successor, the TESS mission, and the James Webb Space Telescope now build upon
              the foundation Kepler laid, pushing further into the search for habitable worlds.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
