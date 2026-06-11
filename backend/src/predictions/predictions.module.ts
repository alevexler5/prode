import { Module, forwardRef } from "@nestjs/common";
import { MatchesModule } from "../matches/matches.module";
import { PredictionsController } from "./predictions.controller";
import { PredictionsService } from "./predictions.service";

@Module({
  imports: [forwardRef(() => MatchesModule)],
  controllers: [PredictionsController],
  providers: [PredictionsService]
})
export class PredictionsModule {}
