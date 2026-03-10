/** PlanetInfoCard — 4-cell info row: radius, type, habitability, temp. */
import { motion } from "framer-motion";
import NumberCounter from "./NumberCounter";
import { getPlanetType, getHabitability } from "../../utils/planetClassifier";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function PlanetInfoCard({ result, inputs }) {
  const radius = result.predicted_radius;
  const type = getPlanetType(radius);
  const hab = getHabitability(
    radius,
    Number(inputs.koi_steff),
    Number(inputs.koi_period)
  );

  const cells = [
    {
      label: "Predicted Radius",
      value: <NumberCounter target={radius} decimals={2} suffix=" R⊕" />,
    },
    {
      label: "Planet Type",
      value: (
        <span style={{ color: type.color }}>{type.label}</span>
      ),
    },
    {
      label: "Habitability",
      value: (
        <span style={{ color: hab.color }}>{hab.label}</span>
      ),
    },
    {
      label: "Host Star Temp",
      value: (
        <span className="font-mono text-[var(--text-mono)]">
          {inputs.koi_steff} K
        </span>
      ),
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
    >
      {cells.map((cell, i) => (
        <motion.div
          key={i}
          variants={item}
          className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[rgba(10,22,40,0.75)] backdrop-blur-md text-center"
        >
          <p className="text-xs font-exo text-[var(--text-secondary)] uppercase tracking-wider mb-2">
            {cell.label}
          </p>
          <p className="text-lg font-orbitron">{cell.value}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
