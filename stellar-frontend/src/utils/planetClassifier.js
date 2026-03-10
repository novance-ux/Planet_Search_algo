/** planetClassifier — Derives planet type and habitability from prediction data. */
import { PLANET_TYPES, PLANET_TYPE_MAP } from "../constants/planetTypes";

/**
 * Get planet type from radius (fallback) or backend label (preferred).
 * @param {number} radius - Predicted planetary radius in R⊕
 * @param {string} [backendType] - planet_type string from backend response
 */
export function getPlanetType(radius, backendType) {
  if (backendType && PLANET_TYPE_MAP[backendType]) {
    return PLANET_TYPE_MAP[backendType];
  }
  for (const pt of PLANET_TYPES) {
    if (radius <= pt.maxRadius) return pt;
  }
  return PLANET_TYPES[PLANET_TYPES.length - 1];
}

export function getHabitability(radius, stellarTemp, period) {
  if (
    radius >= 0.7 &&
    radius <= 2.0 &&
    stellarTemp >= 4000 &&
    stellarTemp <= 7000
  ) {
    return { label: "PROMISING", color: "#00ff88" };
  }
  if (radius > 0 && stellarTemp > 0) {
    return { label: "UNLIKELY", color: "#ffb74d" };
  }
  return { label: "UNKNOWN", color: "#7aa3cc" };
}
