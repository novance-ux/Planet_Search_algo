/** validators — Pure validation functions for all 11 KOI input fields. */
import { INPUT_FIELDS } from "../constants/inputFields";

const fieldMap = Object.fromEntries(INPUT_FIELDS.map((f) => [f.key, f]));

export function validateField(key, value) {
  const field = fieldMap[key];
  if (!field) return { valid: false, message: "Unknown field" };

  if (value === "" || value === null || value === undefined) {
    if (field.optional) return { valid: true, message: "" };
    return { valid: false, message: "This field is required" };
  }

  const num = Number(value);
  if (isNaN(num)) {
    return { valid: false, message: "Must be a valid number" };
  }

  if (num < field.min || num > field.max) {
    return {
      valid: false,
      message: `Must be between ${field.min} and ${field.max}`,
    };
  }

  return { valid: true, message: "" };
}

export function validateAllFields(formData) {
  const errors = {};
  let allValid = true;

  for (const field of INPUT_FIELDS) {
    const result = validateField(field.key, formData[field.key]);
    if (!result.valid) {
      errors[field.key] = result.message;
      allValid = false;
    }
  }

  return { allValid, errors };
}
