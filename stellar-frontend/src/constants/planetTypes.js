/** planetTypes — Radius ranges mapped to planet type labels and colors. */
export const PLANET_TYPES = [
  { maxRadius: 1.5,  label: "Terrestrial",  color: "#8B6355", shadow: "#5C3D2E" },
  { maxRadius: 4.0,  label: "Super-Earth",  color: "#2E8B6E", shadow: "#1B5E4B" },
  { maxRadius: 10.0, label: "Sub-Neptune",  color: "#1E3A8A", shadow: "#0F2456" },
  { maxRadius: Infinity, label: "Gas Giant", color: "#C68642", shadow: "#7B4F28" },
];

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
