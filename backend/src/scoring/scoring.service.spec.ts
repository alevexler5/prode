import { QualifiedAs } from "@prisma/client";
import { ScoringService } from "./scoring.service";

describe("ScoringService", () => {
  const service = new ScoringService();

  it("scores match rules with winner plus exact goals for one team", () => {
    const examples = [
      {
        name: "exact score",
        input: {
          predictedHomeScore: 2,
          predictedAwayScore: 1,
          realHomeScore: 2,
          realAwayScore: 1
        },
        expected: { points: 5, exactHit: true, outcomeHit: true }
      },
      {
        name: "winner hit without exact score",
        input: {
          predictedHomeScore: 1,
          predictedAwayScore: 0,
          realHomeScore: 2,
          realAwayScore: 1
        },
        expected: { points: 3, exactHit: false, outcomeHit: true }
      },
      {
        name: "draw hit without exact score",
        input: {
          predictedHomeScore: 1,
          predictedAwayScore: 1,
          realHomeScore: 2,
          realAwayScore: 2
        },
        expected: { points: 3, exactHit: false, outcomeHit: true }
      },
      {
        name: "winner plus one exact team score",
        input: {
          predictedHomeScore: 2,
          predictedAwayScore: 1,
          realHomeScore: 3,
          realAwayScore: 1
        },
        expected: { points: 4, exactHit: false, outcomeHit: true }
      },
      {
        name: "goal margin hit with wrong outcome",
        input: {
          predictedHomeScore: 3,
          predictedAwayScore: 1,
          realHomeScore: 0,
          realAwayScore: 2
        },
        expected: { points: 2, exactHit: false, outcomeHit: false }
      },
      {
        name: "one team exact goals only",
        input: {
          predictedHomeScore: 2,
          predictedAwayScore: 0,
          realHomeScore: 2,
          realAwayScore: 2
        },
        expected: { points: 1, exactHit: false, outcomeHit: false }
      },
      {
        name: "no hit",
        input: {
          predictedHomeScore: 0,
          predictedAwayScore: 1,
          realHomeScore: 3,
          realAwayScore: 0
        },
        expected: { points: 0, exactHit: false, outcomeHit: false }
      }
    ];

    for (const example of examples) {
      expect(service.scoreMatch(example.input)).toEqual(example.expected);
    }
  });

  it("scores group exact positions and bonus", () => {
    expect(
      service.scoreGroupPrediction("Argentina", "Mexico", [
        { team: "Argentina", position: 1 },
        { team: "Mexico", position: 2 }
      ] as never)
    ).toBe(10);
  });

  it("scores best thirds", () => {
    expect(
      service.scoreBestThirds(["Chile", "Japan"], [
        { team: "Chile", qualifiedAs: QualifiedAs.best_third },
        { team: "Japan", qualifiedAs: QualifiedAs.eliminated }
      ] as never)
    ).toBe(2);
  });
});
