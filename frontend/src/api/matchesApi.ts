import { AdminSummary, Match } from "../types";
import { apiRequest } from "./client";

export const matchesApi = {
  list() {
    return apiRequest<Match[]>("/matches");
  },

  adminSummary() {
    return apiRequest<AdminSummary>("/matches/admin/summary");
  },

  updateResult(matchId: string, input: { homeScore: number; awayScore: number }) {
    return apiRequest<{ match: Match; recalculatedPredictions: number }>(`/matches/${matchId}/result`, {
      method: "POST",
      body: JSON.stringify(input)
    });
  },

  updateMatch(
    matchId: string,
    input: Partial<{
      kickoff: string;
      venue: string;
      stadium: string;
      status: string;
      isPredictionEnabled: boolean;
    }>
  ) {
    return apiRequest<Match>(`/matches/${matchId}`, {
      method: "PATCH",
      body: JSON.stringify(input)
    });
  },

  confirmMatch(matchId: string, input: { homeTeam: string; awayTeam: string }) {
    return apiRequest<Match>(`/matches/${matchId}/confirm`, {
      method: "POST",
      body: JSON.stringify(input)
    });
  }
};
