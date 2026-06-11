import { Injectable, NotFoundException } from "@nestjs/common";
import { MatchStatus, Prisma } from "@prisma/client";
import { DomainErrorCode } from "../common/domain-error-codes";
import { DomainException } from "../common/domain.exception";
import { PrismaService } from "../prisma/prisma.service";
import { RankingService } from "../ranking/ranking.service";
import { ScoringService } from "../scoring/scoring.service";
import { ConfirmMatchDto } from "./dto/confirm-match.dto";
import { MatchQueryDto } from "./dto/match-query.dto";
import { UpdateResultDto } from "./dto/update-result.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";

@Injectable()
export class MatchesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scoring: ScoringService,
    private readonly ranking: RankingService
  ) {}

  findAll(query: MatchQueryDto) {
    const where: Prisma.MatchWhereInput = {
      phase: query.phase,
      group: query.group,
      status: query.status
    };

    if (query.team) {
      where.OR = [
        { homeTeam: { contains: query.team, mode: "insensitive" } },
        { awayTeam: { contains: query.team, mode: "insensitive" } }
      ];
    }

    return this.prisma.match.findMany({
      where,
      orderBy: { kickoff: "asc" }
    });
  }

  findAvailableForPrediction() {
    return this.prisma.match.findMany({
      where: {
        isPredictionEnabled: true,
        homeTeam: { not: null },
        awayTeam: { not: null },
        status: { in: [MatchStatus.scheduled, MatchStatus.blocked] }
      },
      orderBy: { kickoff: "asc" }
    });
  }

  getPendingResults() {
    return this.prisma.match.findMany({
      where: {
        homeTeam: { not: null },
        awayTeam: { not: null }
      },
      orderBy: [{ status: "asc" }, { kickoff: "asc" }]
    });
  }

  async findByIdOrThrow(id: string) {
    const match = await this.prisma.match.findUnique({ where: { id } });
    if (!match) {
      throw new NotFoundException("Match not found");
    }
    return match;
  }

  async updateMatch(id: string, dto: UpdateMatchDto, adminUserId: string) {
    const match = await this.findByIdOrThrow(id);

    if (dto.isPredictionEnabled && (!match.homeTeam || !match.awayTeam)) {
      throw new DomainException(
        DomainErrorCode.MATCH_NOT_CONFIRMED,
        "Cannot enable predictions for an unconfirmed match"
      );
    }

    const updated = await this.prisma.match.update({
      where: { id },
      data: {
        kickoff: dto.kickoff ? new Date(dto.kickoff) : undefined,
        venue: dto.venue,
        stadium: dto.stadium,
        status: dto.status,
        isPredictionEnabled: dto.isPredictionEnabled
      }
    });

    await this.logAdminAction(adminUserId, "match.updated", "Match", id, dto);
    return updated;
  }

  async confirmMatch(id: string, dto: ConfirmMatchDto, adminUserId: string) {
    await this.findByIdOrThrow(id);

    const updated = await this.prisma.match.update({
      where: { id },
      data: {
        homeTeam: dto.homeTeam,
        awayTeam: dto.awayTeam,
        homePlaceholder: null,
        awayPlaceholder: null,
        isPredictionEnabled: true
      }
    });

    await this.logAdminAction(adminUserId, "match.confirmed", "Match", id, dto);
    return updated;
  }

  async updateResult(id: string, dto: UpdateResultDto, adminUserId: string) {
    const match = await this.findByIdOrThrow(id);

    if (!match.homeTeam || !match.awayTeam) {
      throw new DomainException(DomainErrorCode.MATCH_NOT_CONFIRMED, "Cannot load result for an unconfirmed match");
    }

    let recalculatedPredictions = 0;
    await this.prisma.$transaction(async (tx) => {
      await tx.match.update({
        where: { id },
        data: {
          realHomeScore: dto.homeScore,
          realAwayScore: dto.awayScore,
          status: MatchStatus.finished
        }
      });

      const predictions = await tx.prediction.findMany({ where: { matchId: id } });
      recalculatedPredictions = predictions.length;
      for (const prediction of predictions) {
        const score = this.scoring.scoreMatch({
          predictedHomeScore: prediction.predictedHomeScore,
          predictedAwayScore: prediction.predictedAwayScore,
          realHomeScore: dto.homeScore,
          realAwayScore: dto.awayScore
        });

        await tx.prediction.update({
          where: { id: prediction.id },
          data: score
        });
      }

      await tx.adminActionLog.create({
        data: {
          userId: adminUserId,
          action: "match.result_updated",
          entity: "Match",
          entityId: id,
          details: { ...dto, previousHomeScore: match.realHomeScore, previousAwayScore: match.realAwayScore }
        }
      });
    });

    await this.ranking.recalculateTotals();
    return {
      match: await this.findByIdOrThrow(id),
      recalculatedPredictions
    };
  }

  async getAdminSummary() {
    const [total, pending, enabled, finished, missingResults] = await Promise.all([
      this.prisma.match.count(),
      this.prisma.match.count({ where: { status: MatchStatus.scheduled } }),
      this.prisma.match.count({ where: { isPredictionEnabled: true } }),
      this.prisma.match.count({ where: { status: MatchStatus.finished } }),
      this.prisma.match.count({
        where: {
          status: MatchStatus.finished,
          OR: [{ realHomeScore: null }, { realAwayScore: null }]
        }
      })
    ]);

    const recentActions = await this.prisma.adminActionLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { user: { select: { name: true, email: true } } }
    });

    return { total, pending, enabled, finished, missingResults, recentActions };
  }

  private logAdminAction(userId: string, action: string, entity: string, entityId: string, details: unknown) {
    return this.prisma.adminActionLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        details: details as Prisma.InputJsonValue
      }
    });
  }
}
