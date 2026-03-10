/** RadiusDistributionChart — Recharts area chart with prediction marker. */
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
} from "recharts";
import { RADIUS_DISTRIBUTION } from "../../constants/planetTypes";

export default function RadiusDistributionChart({ predictedRadius }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart
        data={RADIUS_DISTRIBUTION}
        margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
      >
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="radius"
          tick={{ fill: "var(--text-secondary)", fontSize: 10, fontFamily: "Space Mono" }}
          stroke="var(--border-subtle)"
          label={{
            value: "Radius (R⊕)",
            position: "bottom",
            offset: 0,
            style: { fill: "var(--text-secondary)", fontSize: 11 },
          }}
        />
        <YAxis
          tick={{ fill: "var(--text-secondary)", fontSize: 10, fontFamily: "Space Mono" }}
          stroke="var(--border-subtle)"
        />
        <Tooltip
          contentStyle={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-glow)",
            borderRadius: "8px",
            fontFamily: "Space Mono",
            fontSize: "11px",
          }}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke="var(--accent-cyan)"
          fill="url(#areaFill)"
          strokeWidth={2}
          animationDuration={1500}
        />
        {predictedRadius != null && (
          <ReferenceLine
            x={predictedRadius}
            stroke="var(--accent-gold)"
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{
              value: "YOUR PREDICTION",
              fill: "var(--accent-gold)",
              fontSize: 10,
              fontFamily: "Orbitron",
              position: "top",
            }}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
