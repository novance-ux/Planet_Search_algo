/** DataFlowWheel — SVG animated 5-segment circular diagram for Section 2. */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SEGMENTS = [
  { label: "ENTER INPUTS", color: "#FFD600", icon: "⌨" },
  { label: "VISUALIZE EARTH", color: "#00C853", icon: "🌍" },
  { label: "VISUALIZE PLANET", color: "#00BCD4", icon: "🪐" },
  { label: "SHOW DISTANCE", color: "#2196F3", icon: "↔" },
  { label: "SHOW RADIUS DIFF", color: "#7B2FFF", icon: "⇔" },
];

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = {
    x: cx + r * Math.cos(startAngle),
    y: cy + r * Math.sin(startAngle),
  };
  const end = {
    x: cx + r * Math.cos(endAngle),
    y: cy + r * Math.sin(endAngle),
  };
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export default function DataFlowWheel() {
  const containerRef = useRef(null);
  const pathRefs = useRef([]);

  useEffect(() => {
    const paths = pathRefs.current.filter(Boolean);
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        paths.forEach((path, i) => {
          const length = path.getTotalLength();
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power2.out",
          });
        });
      },
    });

    return () => trigger.kill();
  }, []);

  const cx = 150,
    cy = 150,
    r = 100;
  const gap = 0.08;
  const segAngle = (2 * Math.PI) / SEGMENTS.length;

  return (
    <div ref={containerRef} className="flex justify-center">
      <svg width="300" height="300" viewBox="0 0 300 300">
        {SEGMENTS.map((seg, i) => {
          const startA = i * segAngle + gap;
          const endA = (i + 1) * segAngle - gap;
          const d = describeArc(cx, cy, r, startA, endA);
          const midA = (startA + endA) / 2;
          const lx = cx + (r + 30) * Math.cos(midA);
          const ly = cy + (r + 30) * Math.sin(midA);

          return (
            <g key={i}>
              <path
                ref={(el) => (pathRefs.current[i] = el)}
                d={d}
                fill="none"
                stroke={seg.color}
                strokeWidth="16"
                strokeLinecap="round"
                opacity="0.85"
                className="hover:opacity-100 transition-opacity cursor-pointer"
                style={{ filter: `drop-shadow(0 0 6px ${seg.color}40)` }}
              />
              <text
                x={lx}
                y={ly}
                fill={seg.color}
                fontSize="8"
                fontFamily="Space Mono"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {seg.label}
              </text>
            </g>
          );
        })}
        {/* Center text */}
        <text
          x={cx}
          y={cy - 8}
          fill="var(--text-primary)"
          fontSize="10"
          fontFamily="Orbitron"
          textAnchor="middle"
        >
          PIPELINE
        </text>
        <text
          x={cx}
          y={cy + 8}
          fill="var(--accent-cyan)"
          fontSize="8"
          fontFamily="Space Mono"
          textAnchor="middle"
        >
          5 STAGES
        </text>
      </svg>
    </div>
  );
}
