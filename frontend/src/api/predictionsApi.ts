import { Prediction } from "../types";
import { apiRequest } from "./client";

export const predictionsApi = {
  mine() {
    return apiRequest<Prediction[]>("/predictions/me");
  },

  create(matchId: string, input: { predictedHomeScore: number; predictedAwayScore: number }) {
    return apiRequest<Prediction>(`/predictions/${matchId}`, {
      method: "POST",
      body: JSON.stringify(input)
    });
  },

  update(matchId: string, input: { predictedHomeScore: number; predictedAwayScore: number }) {
    return apiRequest<Prediction>(`/predictions/${matchId}`, {
      method: "PUT",
      body: JSON.stringify(input)
    });
  }
};
