import { Injectable } from "@nestjs/common";
import { GroupStanding, QualifiedAs } from "@prisma/client";

export type ScoreInput = {
  predictedHomeScore: number;
  predictedAwayScore: number;
  realHomeScore: number;
  realAwayScore: number;
};

export type MatchScoreResult = {
  points: number;
  exactHit: boolean;
  outcomeHit: boolean;
};

@Injectable()
export class ScoringService {
  scoreMatch(input: ScoreInput): MatchScoreResult {
    const predictedDiff = input.predictedHomeScore - input.predictedAwayScore;
    const realDiff = input.realHomeScore - input.realAwayScore;
    const predictedMargin = Math.abs(predictedDiff);
    const realMargin = Math.abs(realDiff);
    const oneTeamGoalsHit =
      input.predictedHomeScore === input.realHomeScore ||
      input.predictedAwayScore === input.realAwayScore;
    const exactHit =
      input.predictedHomeScore === input.realHomeScore &&
      input.predictedAwayScore === input.realAwayScore;
    const outcomeHit = Math.sign(predictedDiff) === Math.sign(realDiff);

    if (exactHit) {
      return { points: 5, exactHit, outcomeHit };
    }

    let points = 0;

    if (outcomeHit) {
      points += 3;
    } else if (predictedMargin === realMargin) {
      points += 2;
    }

    if (oneTeamGoalsHit) {
      points += 1;
    }

    return { points, exactHit, outcomeHit };
  }

  scoreGroupPrediction(
    predictedFirstTeam: string,
    predictedSecondTeam: string,
    standings: Pick<GroupStanding, "team" | "position">[]
  ) {
    const first = standings.find((standing) => standing.position === 1)?.team;
    const second = standings.find((standing) => standing.position === 2)?.team;
    let points = 0;

    if (predictedFirstTeam === first) {
      points += 4;
    }

    if (predictedSecondTeam === second) {
      points += 4;
    }

    const predictedTopTwo = [predictedFirstTeam, predictedSecondTeam];
    const realTopTwo = [first, second].filter(Boolean);

    if (predictedFirstTeam !== first && realTopTwo.includes(predictedFirstTeam)) {
      points += 2;
    }

    if (predictedSecondTeam !== second && realTopTwo.includes(predictedSecondTeam)) {
      points += 2;
    }

    if (predictedFirstTeam === first && predictedSecondTeam === second) {
      points += 2;
    }

    return points;
  }

  scoreBestThirds(predictedTeams: string[], standings: Pick<GroupStanding, "team" | "qualifiedAs">[]) {
    const realBestThirds = new Set(
      standings
        .filter((standing) => standing.qualifiedAs === QualifiedAs.best_third)
        .map((standing) => standing.team)
    );

    return predictedTeams.reduce((points, team) => points + (realBestThirds.has(team) ? 2 : 0), 0);
  }
}
