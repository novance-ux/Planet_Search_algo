/** NewsPage — Recent news in exoplanet discovery. */
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const NEWS_ITEMS = [
  {
    date: "2024",
    title: "James Webb Space Telescope Confirms Rocky Exoplanet Atmospheres",
    summary: "JWST provided the first definitive detection of atmospheric composition on a rocky exoplanet, revealing carbon dioxide and water vapor signatures — a landmark for habitability studies.",
    tag: "JWST",
  },
  {
    date: "2024",
    title: "TESS Discovers New Super-Earth in Habitable Zone",
    summary: "NASA's Transiting Exoplanet Survey Satellite (TESS) identified a super-Earth candidate orbiting within its star's habitable zone, making it a prime target for atmospheric characterization.",
    tag: "TESS",
  },
  {
    date: "2023",
    title: "Machine Learning Identifies 301 New Exoplanets from Kepler Data",
    summary: "A deep learning algorithm called ExoMiner analyzed archival Kepler data and identified 301 previously unconfirmed exoplanets, demonstrating the power of AI in astronomical discovery.",
    tag: "AI/ML",
  },
  {
    date: "2023",
    title: "First Direct Image of Exoplanet Using Ground-Based Telescope",
    summary: "Astronomers captured the first direct image of a Jupiter-sized exoplanet using adaptive optics on a ground-based telescope, opening new avenues for planetary characterization.",
    tag: "Imaging",
  },
  {
    date: "2023",
    title: "Habitable Zone Planets May Be More Common Than Thought",
    summary: "Updated estimates from Kepler data suggest that 1 in 5 Sun-like stars hosts an Earth-sized planet in the habitable zone — billions of potential Earth-like worlds in our galaxy alone.",
    tag: "Statistics",
  },
  {
    date: "2022",
    title: "Kepler's Final Catalog: 2,681 Confirmed Exoplanets",
    summary: "The final Kepler mission catalog was released with 2,681 confirmed exoplanets and over 2,000 remaining candidates, cementing Kepler's legacy as the most prolific planet-hunting mission.",
    tag: "Kepler",
  },
];

export default function NewsPage({ onBack }) {
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
              [ TRANSMISSION · RECENT NEWS ]
            </p>
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold">
              Recent Discoveries
            </h1>
            <p className="font-exo text-sm text-[var(--text-secondary)] mt-2">
              Latest breakthroughs in exoplanet science and detection
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border-glow)]" />

            {NEWS_ITEMS.map((news, i) => (
              <motion.div
                key={i}
                variants={item}
                className="relative pl-12 pb-8 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_10px_var(--accent-cyan)]" />

                <div className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-[var(--text-mono)] opacity-60">
                      {news.date}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[rgba(0,212,255,0.1)] border border-[var(--border-glow)] font-mono text-[10px] text-[var(--accent-cyan)]">
                      {news.tag}
                    </span>
                  </div>
                  <h2 className="font-orbitron text-sm text-[var(--text-primary)] mb-2">
                    {news.title}
                  </h2>
                  <p className="font-exo text-xs text-[var(--text-secondary)] leading-relaxed">
                    {news.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
