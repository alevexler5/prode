import { RankingRow } from "../types";
import { apiRequest } from "./client";

export const rankingApi = {
  list() {
    return apiRequest<RankingRow[]>("/ranking");
  }
};
