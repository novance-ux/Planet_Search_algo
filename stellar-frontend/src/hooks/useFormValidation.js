/** useFormValidation — Manages form state and validation for all 11 input fields. */
import { useState, useCallback } from "react";
import { INPUT_FIELDS } from "../constants/inputFields";
import { validateField, validateAllFields } from "../utils/validators";

const initialValues = Object.fromEntries(
  INPUT_FIELDS.map((f) => [f.key, ""])
);

export function useFormValidation() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = useCallback((key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
    const result = validateField(key, value);
    setErrors((prev) => ({
      ...prev,
      [key]: result.valid ? "" : result.message,
    }));
  }, []);

  const setAllValues = useCallback((data) => {
    setValues(data);
    const allTouched = {};
    const newErrors = {};
    for (const key of Object.keys(data)) {
      allTouched[key] = true;
      const result = validateField(key, data[key]);
      newErrors[key] = result.valid ? "" : result.message;
    }
    setTouched(allTouched);
    setErrors(newErrors);
  }, []);

  const validateAll = useCallback(() => {
    const { allValid, errors: newErrors } = validateAllFields(values);
    setErrors(newErrors);
    const allTouched = {};
    for (const f of INPUT_FIELDS) allTouched[f.key] = true;
    setTouched(allTouched);
    return allValid;
  }, [values]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, []);

  const isFieldValid = useCallback(
    (key) => touched[key] && !errors[key] && values[key] !== "",
    [touched, errors, values]
  );

  const isFieldInvalid = useCallback(
    (key) => touched[key] && !!errors[key],
    [touched, errors]
  );

  return {
    values,
    errors,
    touched,
    setValue,
    setAllValues,
    validateAll,
    resetForm,
    isFieldValid,
    isFieldInvalid,
  };
}
