import { Injectable } from "@nestjs/common";
import { QualifiedAs } from "@prisma/client";
import { DomainErrorCode } from "../common/domain-error-codes";
import { DomainException } from "../common/domain.exception";
import { PrismaService } from "../prisma/prisma.service";
import { RankingService } from "../ranking/ranking.service";
import { ScoringService } from "../scoring/scoring.service";
import { UpsertGroupPredictionsDto } from "./dto/upsert-group-predictions.dto";
import { UpsertStandingsDto } from "./dto/upsert-standings.dto";

const GROUP_PREDICTIONS_DEADLINE = new Date("2026-06-22T03:00:00.000Z");

@Injectable()
export class GroupPredictionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scoring: ScoringService,
    private readonly ranking: RankingService
  ) {}

  async findMine(userId: string) {
    const [groups, bestThirds] = await Promise.all([
      this.prisma.groupPrediction.findMany({ where: { userId }, orderBy: { group: "asc" } }),
      this.prisma.bestThirdsPrediction.findUnique({ where: { userId } })
    ]);

    return { groups, bestThirds };
  }

  async upsertMine(userId: string, dto: UpsertGroupPredictionsDto) {
    await this.assertGroupPredictionsEditable();
    this.assertValidPayload(dto);

    await this.prisma.$transaction(async (tx) => {
      for (const group of dto.groups) {
        await tx.groupPrediction.upsert({
          where: { userId_group: { userId, group: group.group } },
          update: {
            predictedFirstTeam: group.predictedFirstTeam,
            predictedSecondTeam: group.predictedSecondTeam
          },
          create: {
            userId,
            group: group.group,
            predictedFirstTeam: group.predictedFirstTeam,
            predictedSecondTeam: group.predictedSecondTeam
          }
        });
      }

      await tx.bestThirdsPrediction.upsert({
        where: { userId },
        update: { predictedTeams: dto.bestThirds },
        create: { userId, predictedTeams: dto.bestThirds }
      });
    });

    return this.findMine(userId);
  }

  async upsertStandingsAndCalculate(dto: UpsertStandingsDto, adminUserId: string) {
    this.assertValidStandings(dto);
    let recalculatedGroups = 0;
    let recalculatedBestThirds = 0;

    await this.prisma.$transaction(async (tx) => {
      for (const standing of dto.standings) {
        await tx.groupStanding.upsert({
          where: { group_team: { group: standing.group, team: standing.team } },
          update: standing,
          create: standing
        });
      }

      const standings = await tx.groupStanding.findMany();
      const groups = await tx.groupPrediction.findMany();
      recalculatedGroups = groups.length;
      for (const prediction of groups) {
        const groupStandings = standings.filter((standing) => standing.group === prediction.group);
        const points = this.scoring.scoreGroupPrediction(
          prediction.predictedFirstTeam,
          prediction.predictedSecondTeam,
          groupStandings
        );

        await tx.groupPrediction.update({
          where: { id: prediction.id },
          data: { points }
        });
      }

      const bestThirdsPredictions = await tx.bestThirdsPrediction.findMany();
      recalculatedBestThirds = bestThirdsPredictions.length;
      for (const prediction of bestThirdsPredictions) {
        const points = this.scoring.scoreBestThirds(prediction.predictedTeams, standings);
        await tx.bestThirdsPrediction.update({
          where: { id: prediction.id },
          data: { points }
        });
      }

      await tx.adminActionLog.create({
        data: {
          userId: adminUserId,
          action: "group_standings.calculated",
          entity: "GroupStanding",
          entityId: "group-standings",
          details: {
            standings: dto.standings.length,
            recalculatedGroups,
            recalculatedBestThirds
          }
        }
      });
    });

    await this.ranking.recalculateTotals();
    return {
      standings: await this.prisma.groupStanding.findMany({ orderBy: [{ group: "asc" }, { position: "asc" }] }),
      recalculatedGroups,
      recalculatedBestThirds
    };
  }

  private assertGroupPredictionsEditable() {
    if (new Date() >= GROUP_PREDICTIONS_DEADLINE) {
      throw new DomainException(DomainErrorCode.PREDICTION_LOCKED, "Group prediction deadline has passed");
    }
  }

  private assertValidPayload(dto: UpsertGroupPredictionsDto) {
    for (const group of dto.groups) {
      if (group.predictedFirstTeam === group.predictedSecondTeam) {
        throw new DomainException(
          DomainErrorCode.DUPLICATED_GROUP_TEAM,
          `Group ${group.group} cannot repeat the same team`
        );
      }
    }

    if (new Set(dto.bestThirds).size !== dto.bestThirds.length) {
      throw new DomainException(DomainErrorCode.DUPLICATED_GROUP_TEAM, "Best third teams cannot be duplicated");
    }
  }

  private assertValidStandings(dto: UpsertStandingsDto) {
    const byGroup = new Map<string, Set<number>>();
    const teams = new Set<string>();
    const bestThirds = dto.standings.filter((standing) => standing.qualifiedAs === QualifiedAs.best_third);

    if (bestThirds.length !== 8) {
      throw new DomainException(DomainErrorCode.INVALID_BEST_THIRDS_COUNT, "Exactly 8 best thirds are required");
    }

    for (const standing of dto.standings) {
      if (teams.has(standing.team)) {
        throw new DomainException(DomainErrorCode.DUPLICATED_GROUP_TEAM, `Team ${standing.team} is duplicated`);
      }
      teams.add(standing.team);

      const positions = byGroup.get(standing.group) ?? new Set<number>();
      if (positions.has(standing.position)) {
        throw new DomainException(
          DomainErrorCode.DUPLICATED_STANDING_POSITION,
          `Group ${standing.group} has duplicated position ${standing.position}`
        );
      }
      positions.add(standing.position);
      byGroup.set(standing.group, positions);
    }
  }
}
