/** usePrediction — Handles the ML inference API call. States: idle | loading | success | error */
import axios from "axios";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function usePrediction() {
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const predict = async (formData) => {
    setStatus("loading");
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/api/predict`, formData, {
        timeout: 30000,
        headers: { "Content-Type": "application/json" },
      });
      /* Normalize backend response to a consistent shape */
      const data = response.data;
      const normalized = {
        classification: data.prediction || data.classification,
        classification_probability:
          data.confirmation_probability != null
            ? data.confirmation_probability / 100
            : data.classification_probability ?? 0.5,
        predicted_radius: data.predicted_radius,
        confidence_score:
          data.confidence_score ??
          (data.confirmation_probability != null
            ? data.confirmation_probability / 100
            : null),
        planet_type: data.planet_type,
        habitability_score: data.habitability_score,
        habitability_factors: data.habitability_factors,
        clf_breakdown: data.clf_breakdown,
        reg_breakdown: data.reg_breakdown,
        raw: data,
      };
      setResult(normalized);
      setStatus("success");
      return normalized;
    } catch (err) {
      const message =
        err.code === "ECONNABORTED"
          ? "Mission Control unreachable. Request timed out."
          : err.response?.status === 422
          ? "Invalid signal parameters detected by server."
          : err.response?.status === 500
          ? "Analysis failed. Server encountered an error."
          : "Connection failed. Check your backend is running.";
      setError(message);
      setStatus("error");
      throw err;
    }
  };

  const reset = () => {
    setStatus("idle");
    setResult(null);
    setError(null);
  };

  return { predict, reset, status, result, error };
}
