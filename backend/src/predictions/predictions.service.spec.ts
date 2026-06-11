import { MatchStatus } from "@prisma/client";
import { DomainErrorCode } from "../common/domain-error-codes";
import { DomainException } from "../common/domain.exception";
import { PredictionsService } from "./predictions.service";

describe("PredictionsService", () => {
  const prisma = {
    prediction: {
      findUnique: jest.fn(),
      update: jest.fn()
    }
  };
  const matchesService = {
    findByIdOrThrow: jest.fn()
  };
  const service = new PredictionsService(prisma as never, matchesService as never);

  const baseMatch = {
    homeTeam: "Argentina",
    awayTeam: "Mexico",
    homePlaceholder: null,
    awayPlaceholder: null,
    isPredictionEnabled: true,
    kickoff: new Date(Date.now() + 60 * 60 * 1000),
    status: MatchStatus.scheduled
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("allows editing before the deadline", () => {
    expect(() => (service as any).assertEditable(baseMatch)).not.toThrow();
  });

  it("rejects placeholders", () => {
    expect(() =>
      (service as any).assertEditable({
        ...baseMatch,
        homeTeam: null,
        homePlaceholder: "1A"
      })
    ).toThrow(DomainException);
  });

  it("rejects locked matches", () => {
    expect(() =>
      (service as any).assertEditable({
        ...baseMatch,
        kickoff: new Date(Date.now() + 5 * 60 * 1000)
      })
    ).toThrow(DomainException);
  });

  it("rejects finished matches", () => {
    expect(() =>
      (service as any).assertEditable({
        ...baseMatch,
        status: MatchStatus.finished
      })
    ).toThrow(DomainException);
  });

  it("rejects updating a prediction that does not belong to the user", async () => {
    matchesService.findByIdOrThrow.mockResolvedValue(baseMatch);
    prisma.prediction.findUnique.mockResolvedValue(null);

    try {
      await service.update("user-2", "match-1", {
        predictedHomeScore: 1,
        predictedAwayScore: 0
      });
      fail("Expected prediction update to reject");
    } catch (error) {
      expect((error as { getResponse?: () => unknown }).getResponse?.()).toMatchObject({
        code: DomainErrorCode.PREDICTION_NOT_FOUND
      });
    }

    expect(prisma.prediction.update).not.toHaveBeenCalled();
  });
});
