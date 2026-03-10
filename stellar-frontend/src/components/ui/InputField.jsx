/** InputField — Single KOI input field with label, tooltip, validation state. */
import React from "react";
import TooltipIcon from "./TooltipIcon";
import ValidationMessage from "./ValidationMessage";

const InputField = React.memo(function InputField({
  field,
  value,
  error,
  isValid,
  isInvalid,
  onChange,
}) {
  const id = `field-${field.key}`;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="flex items-center text-xs font-exo uppercase tracking-wider text-[var(--text-secondary)]"
      >
        {field.label}
        {field.unit && (
          <span className="ml-1 text-[var(--accent-cyan)] opacity-60">
            ({field.unit})
          </span>
        )}
        <TooltipIcon text={field.tooltip} />
      </label>

      <div className="input-border-animate">
        <input
          id={id}
          type="number"
          step={field.step}
          value={value}
          onChange={(e) => onChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          className={`w-full bg-[var(--bg-input)] text-[var(--text-primary)] font-mono text-sm px-3 py-2.5 border-none outline-none rounded-none transition-colors
            ${
              isInvalid
                ? "border-b-2 border-[var(--false-positive)] shadow-[0_2px_8px_rgba(255,68,102,0.2)]"
                : isValid
                ? "border-b-2 border-[var(--confirmed)]"
                : "border-b-2 border-[var(--border-subtle)]"
            }`}
          aria-invalid={isInvalid}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>

      <span className="text-[10px] text-[var(--text-secondary)] opacity-50">
        Range: {field.min} – {field.max.toLocaleString()}
        {field.unit ? ` ${field.unit}` : ""}
      </span>

      <div id={`${id}-error`}>
        <ValidationMessage
          isValid={isValid}
          isInvalid={isInvalid}
          errorMessage={error}
        />
      </div>
    </div>
  );
});

export default InputField;
