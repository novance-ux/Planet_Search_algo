/** quadrantClassifier — Determines which region of the scatter chart a planet falls in. */
export function getQuadrant(period, radius) {
  if (period < 10 && radius > 8) return "Hot Jupiters";
  if (period < 10 && radius <= 3) return "Hot Super-Earths";
  if (period >= 100 && radius > 5) return "Cold Giants";
  if (period >= 50 && period <= 500 && radius >= 0.5 && radius <= 2.5)
    return "Earth-like Zone";
  if (radius > 8) return "Cold Giants";
  if (radius <= 2.5) return "Super-Earths";
  return "Sub-Neptune";
}
