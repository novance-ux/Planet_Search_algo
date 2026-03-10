/** KnownPlanetsChart — Recharts scatter chart with 15 reference planets + user signal. */
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceArea,
  Label,
} from "recharts";
import { KNOWN_PLANETS } from "../../constants/knownPlanets";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-glow)] font-mono text-xs">
      <p className="text-[var(--accent-cyan)] font-bold mb-1">
        {d.name || "YOUR SIGNAL"}
      </p>
      <p className="text-[var(--text-secondary)]">
        Period: {d.period} days
      </p>
      <p className="text-[var(--text-secondary)]">
        Radius: {d.radius} R⊕
      </p>
    </div>
  );
}

export default function KnownPlanetsChart({ userPlanet }) {
  return (
    <ResponsiveContainer width="100%" height={420}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
        {/* Quadrant shading */}
        <ReferenceArea
          x1={0.5}
          x2={10}
          y1={8}
          y2={22}
          fill="#FFB74D"
          fillOpacity={0.05}
          label={{ value: "HOT JUPITERS", fill: "#FFB74D", fontSize: 10, position: "insideTopLeft" }}
        />
        <ReferenceArea
          x1={0.5}
          x2={10}
          y1={0}
          y2={3}
          fill="#FF7043"
          fillOpacity={0.05}
          label={{ value: "HOT SUPER-EARTHS", fill: "#FF7043", fontSize: 10, position: "insideTopLeft" }}
        />
        <ReferenceArea
          x1={100}
          x2={100000}
          y1={5}
          y2={22}
          fill="#7B2FFF"
          fillOpacity={0.04}
          label={{ value: "COLD GIANTS", fill: "#7B2FFF", fontSize: 10, position: "insideTopLeft" }}
        />
        <ReferenceArea
          x1={100}
          x2={500}
          y1={0.5}
          y2={2.5}
          fill="#00ff88"
          fillOpacity={0.06}
          label={{ value: "EARTH-LIKE ZONE", fill: "#00ff88", fontSize: 10, position: "insideTopLeft" }}
        />

        <XAxis
          dataKey="period"
          type="number"
          scale="log"
          domain={[0.5, 100000]}
          tick={{ fill: "var(--text-secondary)", fontSize: 10, fontFamily: "Space Mono" }}
          stroke="var(--border-subtle)"
        >
          <Label
            value="Orbital Period (days)"
            position="bottom"
            offset={0}
            style={{ fill: "var(--text-secondary)", fontSize: 11, fontFamily: "Exo 2" }}
          />
        </XAxis>
        <YAxis
          dataKey="radius"
          type="number"
          domain={[0, 22]}
          tick={{ fill: "var(--text-secondary)", fontSize: 10, fontFamily: "Space Mono" }}
          stroke="var(--border-subtle)"
        >
          <Label
            value="Radius (R⊕)"
            angle={-90}
            position="insideLeft"
            style={{ fill: "var(--text-secondary)", fontSize: 11, fontFamily: "Exo 2" }}
          />
        </YAxis>

        <Tooltip content={<CustomTooltip />} />

        {/* Reference planets */}
        <Scatter
          data={KNOWN_PLANETS}
          fill="var(--accent-cyan)"
          shape={(props) => {
            const { cx, cy, payload } = props;
            return (
              <g>
                <circle cx={cx} cy={cy} r={6} fill={payload.color} opacity={0.85} />
                <text
                  x={cx}
                  y={cy - 10}
                  fill={payload.color}
                  fontSize={8}
                  fontFamily="Space Mono"
                  textAnchor="middle"
                  opacity={0.7}
                >
                  {payload.name}
                </text>
              </g>
            );
          }}
        />

        {/* User's planet */}
        {userPlanet && (
          <Scatter
            data={[userPlanet]}
            shape={(props) => {
              const { cx, cy } = props;
              return (
                <g>
                  <circle cx={cx} cy={cy} r={14} fill="#00d4ff" opacity={0.3}>
                    <animate
                      attributeName="r"
                      values="14;22;14"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.3;0.1;0.3"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx={cx} cy={cy} r={8} fill="#00d4ff" />
                  <text
                    x={cx + 20}
                    y={cy - 10}
                    fill="#00d4ff"
                    fontSize={10}
                    fontFamily="Orbitron"
                    fontWeight="bold"
                  >
                    YOUR SIGNAL
                  </text>
                  <line
                    x1={cx + 18}
                    y1={cy - 4}
                    x2={cx + 10}
                    y2={cy}
                    stroke="#00d4ff"
                    strokeWidth={1}
                    strokeDasharray="3,3"
                  />
                </g>
              );
            }}
          />
        )}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
