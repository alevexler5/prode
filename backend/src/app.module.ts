import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { GroupPredictionsModule } from "./group-predictions/group-predictions.module";
import { HealthModule } from "./health/health.module";
import { MatchesModule } from "./matches/matches.module";
import { PredictionsModule } from "./predictions/predictions.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RankingModule } from "./ranking/ranking.module";
import { ScoringModule } from "./scoring/scoring.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    HealthModule,
    ScoringModule,
    MatchesModule,
    PredictionsModule,
    GroupPredictionsModule,
    RankingModule
  ]
})
export class AppModule {}
