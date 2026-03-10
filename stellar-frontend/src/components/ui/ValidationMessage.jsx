/** ValidationMessage — Inline error or success message below an input field. */
import React from "react";
import { Check } from "lucide-react";

const ValidationMessage = React.memo(function ValidationMessage({
  isValid,
  isInvalid,
  errorMessage,
}) {
  if (isValid) {
    return (
      <span className="flex items-center gap-1 text-xs mt-1 text-[var(--confirmed)]">
        <Check size={12} aria-hidden="true" /> Valid
      </span>
    );
  }
  if (isInvalid && errorMessage) {
    return (
      <span className="text-xs mt-1 text-[var(--false-positive)]">
        {errorMessage}
      </span>
    );
  }
  return null;
});

export default ValidationMessage;
