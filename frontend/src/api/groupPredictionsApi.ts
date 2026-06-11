import { BestThirdsPredictionRecord, GroupPredictionRecord } from "../types";
import { apiRequest } from "./client";

export type GroupPick = {
  group: string;
  predictedFirstTeam: string;
  predictedSecondTeam: string;
};

export type GroupPredictionsPayload = {
  groups: GroupPick[];
  bestThirds: string[];
};

export const groupPredictionsApi = {
  mine() {
    return apiRequest<{ groups: GroupPredictionRecord[]; bestThirds: BestThirdsPredictionRecord | null }>(
      "/group-predictions/me"
    );
  },

  save(input: GroupPredictionsPayload) {
    return apiRequest("/group-predictions", {
      method: "POST",
      body: JSON.stringify(input)
    });
  },

  calculateStandings(input: {
    standings: Array<{
      group: string;
      team: string;
      position: number;
      points: number;
      goalDifference: number;
      goalsFor: number;
      qualifiedAs: string;
    }>;
  }) {
    return apiRequest("/group-predictions/calculate", {
      method: "POST",
      body: JSON.stringify(input)
    });
  }
};
