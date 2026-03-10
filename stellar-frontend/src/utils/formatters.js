/** formatters — Utility formatting functions. */
export function formatTimestamp() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function formatRadius(value) {
  if (value == null) return "—";
  return `${Number(value).toFixed(2)} R⊕`;
}

export function formatConfidence(value) {
  if (value == null) return "—%";
  return `${Number(value).toFixed(1)}%`;
}
