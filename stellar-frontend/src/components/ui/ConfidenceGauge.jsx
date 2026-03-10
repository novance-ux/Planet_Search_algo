/** ConfidenceGauge — SVG semi-circle needle gauge for classification probability. */
import { motion } from "framer-motion";
import NumberCounter from "./NumberCounter";

export default function ConfidenceGauge({ probability }) {
  const pct = probability != null ? probability * 100 : null;
  const angle = pct != null ? (pct / 100) * 180 : 0;

  /* Semi-circle arc (SVG) */
  const cx = 120,
    cy = 110,
    r = 80;
  const startAngle = Math.PI;
  const endAngle = 0;

  function polarToCart(angleDeg) {
    const rad = (Math.PI * angleDeg) / 180;
    return {
      x: cx + r * Math.cos(Math.PI - rad),
      y: cy - r * Math.sin(Math.PI - rad),
    };
  }

  const needleEnd = polarToCart(angle);
  const circumference = Math.PI * r;

  return (
    <div className="flex flex-col items-center">
      <svg width="240" height="140" viewBox="0 0 240 140">
        {/* Background arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="var(--bg-input)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Colored arc */}
        <motion.path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset:
              pct != null ? circumference - (pct / 100) * circumference : circumference,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--false-positive)" />
            <stop offset="50%" stopColor="var(--warning)" />
            <stop offset="100%" stopColor="var(--confirmed)" />
          </linearGradient>
        </defs>
        {/* Needle */}
        <motion.line
          x1={cx}
          y1={cy}
          initial={{ x2: cx - r + 10, y2: cy }}
          animate={{ x2: needleEnd.x, y2: needleEnd.y }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          stroke="var(--text-primary)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="4" fill="var(--accent-cyan)" />
        {/* Labels */}
        <text
          x={cx - r - 5}
          y={cy + 16}
          fill="var(--text-secondary)"
          fontSize="10"
          fontFamily="Space Mono"
          textAnchor="middle"
        >
          0%
        </text>
        <text
          x={cx + r + 5}
          y={cy + 16}
          fill="var(--text-secondary)"
          fontSize="10"
          fontFamily="Space Mono"
          textAnchor="middle"
        >
          100%
        </text>
      </svg>
      <div className="text-2xl font-mono text-[var(--text-primary)] -mt-4">
        {pct != null ? (
          <NumberCounter target={pct} decimals={1} suffix="%" />
        ) : (
          "—%"
        )}
      </div>
    </div>
  );
}
