import { Module, forwardRef } from "@nestjs/common";
import { RankingModule } from "../ranking/ranking.module";
import { ScoringModule } from "../scoring/scoring.module";
import { MatchesController } from "./matches.controller";
import { MatchesService } from "./matches.service";

@Module({
  imports: [ScoringModule, forwardRef(() => RankingModule)],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService]
})
export class MatchesModule {}
