/** usePredictionHistory — In-memory log of all predictions in the session. */
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PREDICTION":
      return [
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          ...action.payload,
        },
        ...state,
      ];
    case "CLEAR_ALL":
      return [];
    default:
      return state;
  }
}

export function usePredictionHistory() {
  const [history, dispatch] = useReducer(reducer, []);
  const addPrediction = (entry) =>
    dispatch({ type: "ADD_PREDICTION", payload: entry });
  const clearHistory = () => dispatch({ type: "CLEAR_ALL" });
  return { history, addPrediction, clearHistory };
}
