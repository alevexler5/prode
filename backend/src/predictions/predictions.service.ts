import { Injectable } from "@nestjs/common";
import { MatchStatus } from "@prisma/client";
import { DomainErrorCode } from "../common/domain-error-codes";
import { DomainException } from "../common/domain.exception";
import { PrismaService } from "../prisma/prisma.service";
import { MatchesService } from "../matches/matches.service";
import { UpsertPredictionDto } from "./dto/upsert-prediction.dto";

const DEADLINE_MINUTES = 15;

@Injectable()
export class PredictionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly matchesService: MatchesService
  ) {}

  findMine(userId: string) {
    return this.prisma.prediction.findMany({
      where: { userId },
      include: { match: true },
      orderBy: { match: { kickoff: "asc" } }
    });
  }

  async create(userId: string, matchId: string, dto: UpsertPredictionDto) {
    const match = await this.matchesService.findByIdOrThrow(matchId);
    this.assertEditable(match);

    return this.prisma.prediction.create({
      data: {
        userId,
        matchId,
        predictedHomeScore: dto.predictedHomeScore,
        predictedAwayScore: dto.predictedAwayScore
      }
    });
  }

  async update(userId: string, matchId: string, dto: UpsertPredictionDto) {
    const match = await this.matchesService.findByIdOrThrow(matchId);
    this.assertEditable(match);
    const prediction = await this.prisma.prediction.findUnique({
      where: { userId_matchId: { userId, matchId } },
      select: { id: true }
    });

    if (!prediction) {
      throw new DomainException(DomainErrorCode.PREDICTION_NOT_FOUND, "Prediction not found for this user");
    }

    return this.prisma.prediction.update({
      where: { userId_matchId: { userId, matchId } },
      data: {
        predictedHomeScore: dto.predictedHomeScore,
        predictedAwayScore: dto.predictedAwayScore
      }
    });
  }

  private assertEditable(match: {
    homeTeam: string | null;
    awayTeam: string | null;
    homePlaceholder: string | null;
    awayPlaceholder: string | null;
    isPredictionEnabled: boolean;
    kickoff: Date;
    status: MatchStatus;
  }) {
    if (!match.homeTeam || !match.awayTeam || match.homePlaceholder || match.awayPlaceholder) {
      throw new DomainException(DomainErrorCode.MATCH_NOT_CONFIRMED, "Only confirmed matches can be predicted");
    }

    if (!match.isPredictionEnabled) {
      throw new DomainException(DomainErrorCode.PREDICTION_NOT_ENABLED, "Match is not enabled for predictions");
    }

    if (match.status === MatchStatus.finished || match.status === MatchStatus.in_progress) {
      throw new DomainException(DomainErrorCode.MATCH_NOT_EDITABLE, "Match is not editable");
    }

    const deadline = new Date(match.kickoff.getTime() - DEADLINE_MINUTES * 60 * 1000);
    if (new Date() >= deadline) {
      throw new DomainException(DomainErrorCode.PREDICTION_LOCKED, "Prediction deadline has passed");
    }
  }
}
