import { QualifiedAs } from "@prisma/client";
import { DomainException } from "../common/domain.exception";
import { GroupPredictionsService } from "./group-predictions.service";

describe("GroupPredictionsService", () => {
  const service = new GroupPredictionsService({} as never, {} as never, {} as never);

  it("rejects duplicated teams inside a group payload", () => {
    expect(() =>
      (service as any).assertValidPayload({
        groups: [{ group: "A", predictedFirstTeam: "Argentina", predictedSecondTeam: "Argentina" }],
        bestThirds: ["Chile", "Uruguay", "Japan", "Senegal", "Croatia", "Canada", "Morocco", "Korea"]
      })
    ).toThrow(DomainException);
  });

  it("rejects duplicated positions in standings", () => {
    expect(() =>
      (service as any).assertValidStandings({
        standings: [
          {
            group: "A",
            team: "Argentina",
            position: 1,
            points: 7,
            goalDifference: 4,
            goalsFor: 6,
            qualifiedAs: QualifiedAs.group_winner
          },
          {
            group: "A",
            team: "Mexico",
            position: 1,
            points: 5,
            goalDifference: 2,
            goalsFor: 4,
            qualifiedAs: QualifiedAs.group_runner_up
          },
          {
            group: "B",
            team: "Chile",
            position: 3,
            points: 4,
            goalDifference: 0,
            goalsFor: 3,
            qualifiedAs: QualifiedAs.best_third
          },
          {
            group: "C",
            team: "Uruguay",
            position: 3,
            points: 4,
            goalDifference: 0,
            goalsFor: 2,
            qualifiedAs: QualifiedAs.best_third
          },
          {
            group: "D",
            team: "Japan",
            position: 3,
            points: 4,
            goalDifference: 1,
            goalsFor: 4,
            qualifiedAs: QualifiedAs.best_third
          },
          {
            group: "E",
            team: "Senegal",
            position: 3,
            points: 4,
            goalDifference: 1,
            goalsFor: 4,
            qualifiedAs: QualifiedAs.best_third
          },
          {
            group: "F",
            team: "Croatia",
            position: 3,
            points: 4,
            goalDifference: 1,
            goalsFor: 4,
            qualifiedAs: QualifiedAs.best_third
          },
          {
            group: "G",
            team: "Canada",
            position: 3,
            points: 4,
            goalDifference: 1,
            goalsFor: 4,
            qualifiedAs: QualifiedAs.best_third
          },
          {
            group: "H",
            team: "Morocco",
            position: 3,
            points: 4,
            goalDifference: 1,
            goalsFor: 4,
            qualifiedAs: QualifiedAs.best_third
          },
          {
            group: "I",
            team: "Korea",
            position: 3,
            points: 4,
            goalDifference: 1,
            goalsFor: 4,
            qualifiedAs: QualifiedAs.best_third
          }
        ]
      })
    ).toThrow(DomainException);
  });
});
