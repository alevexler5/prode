import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RankingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        predictions: true,
        groupPredictions: true,
        bestThirdsPrediction: true
      }
    });

    return users
      .map((user) => {
        const predictionPoints = user.predictions.reduce((sum, prediction) => sum + prediction.points, 0);
        const groupPoints =
          user.groupPredictions.reduce((sum, prediction) => sum + prediction.points, 0) +
          (user.bestThirdsPrediction?.points ?? 0);
        const exactHits = user.predictions.filter((prediction) => prediction.exactHit).length;
        const outcomeHits = user.predictions.filter((prediction) => prediction.outcomeHit).length;
        const loadedPredictions =
          user.predictions.length + user.groupPredictions.length + (user.bestThirdsPrediction ? 1 : 0);

        return {
          userId: user.id,
          name: user.name,
          totalPoints: predictionPoints + groupPoints,
          predictionPoints,
          groupPoints,
          exactHits,
          outcomeHits,
          loadedPredictions,
          createdAt: user.createdAt
        };
      })
      .sort((a, b) => {
        if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
        if (b.exactHits !== a.exactHits) return b.exactHits - a.exactHits;
        if (b.outcomeHits !== a.outcomeHits) return b.outcomeHits - a.outcomeHits;
        if (b.loadedPredictions !== a.loadedPredictions) return b.loadedPredictions - a.loadedPredictions;
        return a.createdAt.getTime() - b.createdAt.getTime();
      })
      .map((row, index) => ({ position: index + 1, ...row }));
  }

  async findOne(userId: string) {
    const ranking = await this.findAll();
    return ranking.find((row) => row.userId === userId) ?? null;
  }

  async recalculateTotals() {
    const users = await this.prisma.user.findMany({
      include: {
        predictions: true,
        groupPredictions: true,
        bestThirdsPrediction: true
      }
    });

    for (const user of users) {
      const predictionPoints = user.predictions.reduce((sum, prediction) => sum + prediction.points, 0);
      const groupPoints =
        user.groupPredictions.reduce((sum, prediction) => sum + prediction.points, 0) +
        (user.bestThirdsPrediction?.points ?? 0);

      await this.prisma.user.update({
        where: { id: user.id },
        data: { totalPoints: predictionPoints + groupPoints }
      });
    }
  }
}
