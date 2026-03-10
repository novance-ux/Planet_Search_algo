/** CosmicContextSection — Section 6: scatter chart of 15 known planets + user signal. */
import { motion } from "framer-motion";
import SectionLabel from "../ui/SectionLabel";
import KnownPlanetsChart from "../ui/KnownPlanetsChart";
import { getQuadrant } from "../../utils/quadrantClassifier";
import { getPlanetType } from "../../utils/planetClassifier";

export default function CosmicContextSection({ result, inputs }) {
  const userPlanet =
    result && result.predicted_radius
      ? {
          name: "YOUR SIGNAL",
          period: Number(inputs?.koi_period) || 100,
          radius: result.predicted_radius,
          color: "#00d4ff",
        }
      : null;

  const quadrant = userPlanet
    ? getQuadrant(userPlanet.period, userPlanet.radius)
    : null;
  const planetType = userPlanet ? getPlanetType(userPlanet.radius, result?.planet_type) : null;

  return (
    <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-8">
      <div>
        <SectionLabel text="COSMIC_CONTEXT · KNOWN_POPULATION" />
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold">
          Your Signal in the Universe
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]"
      >
        <KnownPlanetsChart userPlanet={userPlanet} />
      </motion.div>

      {userPlanet && quadrant && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-exo text-sm text-[var(--text-secondary)] text-center italic"
        >
          Your detected signal appears in the{" "}
          <span className="text-[var(--accent-cyan)] font-semibold">
            {quadrant}
          </span>{" "}
          region — consistent with{" "}
          <span style={{ color: planetType.color }}>{planetType.label}</span>{" "}
          class objects.
        </motion.p>
      )}
    </div>
  );
}
