/** planetTypes — Radius ranges mapped to planet type labels and colors.
 *  Aligned with backend (app.py) boundaries: 0.8 / 1.25 / 2.0 / 4.0 / 10.0 R⊕ */
export const PLANET_TYPES = [
  { maxRadius: 0.8,  label: "Sub-Earth",    color: "#9E7B6B", shadow: "#6B4F42" },
  { maxRadius: 1.25, label: "Earth-like",   color: "#4A90D9", shadow: "#2B5E9E" },
  { maxRadius: 2.0,  label: "Super-Earth",  color: "#2E8B6E", shadow: "#1B5E4B" },
  { maxRadius: 4.0,  label: "Mini-Neptune", color: "#1E3A8A", shadow: "#0F2456" },
  { maxRadius: 10.0, label: "Neptune-like", color: "#5B4A9E", shadow: "#3A2E6B" },
  { maxRadius: Infinity, label: "Gas Giant", color: "#C68642", shadow: "#7B4F28" },
];

/** Map backend planet_type string → PLANET_TYPES entry for consistent styling. */
export const PLANET_TYPE_MAP = Object.fromEntries(
  PLANET_TYPES.map((pt) => [pt.label, pt])
);

/** radiusDistribution — Approximate KOI radius distribution bins. */
export const RADIUS_DISTRIBUTION = [
  { radius: 0.5,  count: 120 },
  { radius: 1.0,  count: 380 },
  { radius: 1.5,  count: 520 },
  { radius: 2.0,  count: 610 },
  { radius: 2.5,  count: 480 },
  { radius: 3.0,  count: 320 },
  { radius: 4.0,  count: 210 },
  { radius: 5.0,  count: 160 },
  { radius: 6.0,  count: 110 },
  { radius: 8.0,  count: 80 },
  { radius: 10.0, count: 55 },
  { radius: 14.0, count: 30 },
  { radius: 20.0, count: 12 },
];
