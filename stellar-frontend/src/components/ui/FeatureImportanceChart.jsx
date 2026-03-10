/** FeatureImportanceChart — Recharts horizontal bar chart of top 8 features. */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FEATURE_IMPORTANCE } from "../../constants/featureImportance";

export default function FeatureImportanceChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={FEATURE_IMPORTANCE}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
      >
        <XAxis
          type="number"
          domain={[0, 0.3]}
          tick={{ fill: "var(--text-secondary)", fontSize: 10, fontFamily: "Space Mono" }}
          stroke="var(--border-subtle)"
        />
        <YAxis
          type="category"
          dataKey="feature"
          tick={{ fill: "var(--text-mono)", fontSize: 10, fontFamily: "Space Mono" }}
          stroke="var(--border-subtle)"
          width={100}
        />
        <Bar dataKey="importance" radius={[0, 4, 4, 0]} animationDuration={1200}>
          {FEATURE_IMPORTANCE.map((_, i) => (
            <Cell
              key={i}
              fill={`rgba(0, 212, 255, ${1 - i * 0.1})`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
