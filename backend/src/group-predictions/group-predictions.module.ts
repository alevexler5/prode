import { Module } from "@nestjs/common";
import { RankingModule } from "../ranking/ranking.module";
import { ScoringModule } from "../scoring/scoring.module";
import { GroupPredictionsController } from "./group-predictions.controller";
import { GroupPredictionsService } from "./group-predictions.service";

@Module({
  imports: [RankingModule, ScoringModule],
  controllers: [GroupPredictionsController],
  providers: [GroupPredictionsService]
})
export class GroupPredictionsModule {}
