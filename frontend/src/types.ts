export type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  totalPoints: number;
};

export type ApiError = {
  statusCode?: number;
  message: string;
  code?: string;
};

export type Match = {
  id: string;
  phase: string;
  group: string | null;
  homeTeam: string | null;
  awayTeam: string | null;
  homePlaceholder: string | null;
  awayPlaceholder: string | null;
  kickoff: string;
  venue: string;
  stadium: string;
  status: string;
  isPredictionEnabled: boolean;
  realHomeScore: number | null;
  realAwayScore: number | null;
};

export type AdminSummary = {
  total: number;
  pending: number;
  enabled: number;
  finished: number;
  missingResults: number;
  recentActions: Array<{
    id: string;
    action: string;
    entity: string;
    entityId: string;
    createdAt: string;
    user: {
      name: string;
      email: string;
    };
  }>;
};

export type GroupPredictionRecord = {
  id: string;
  group: string;
  predictedFirstTeam: string;
  predictedSecondTeam: string;
  points: number;
};

export type BestThirdsPredictionRecord = {
  predictedTeams: string[];
  points: number;
};

export type Prediction = {
  id: string;
  matchId: string;
  predictedHomeScore: number;
  predictedAwayScore: number;
  points: number;
  exactHit: boolean;
  outcomeHit: boolean;
  match?: Match;
};

export type RankingRow = {
  position: number;
  userId: string;
  name: string;
  totalPoints: number;
  predictionPoints: number;
  groupPoints: number;
  exactHits: number;
  outcomeHits: number;
  loadedPredictions: number;
};
