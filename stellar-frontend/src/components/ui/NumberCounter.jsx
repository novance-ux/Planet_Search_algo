/** NumberCounter — Animated number count-up component. */
import React from "react";
import { useNumberCounter } from "../../hooks/useNumberCounter";

const NumberCounter = React.memo(function NumberCounter({
  target,
  duration = 1200,
  decimals = 1,
  suffix = "",
}) {
  const value = useNumberCounter(target, duration, decimals);
  return (
    <span className="font-mono text-[var(--text-mono)]">
      {value}
      {suffix}
    </span>
  );
});

export default NumberCounter;
