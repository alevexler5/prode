import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser, RequestUser } from "../common/decorators/current-user.decorator";
import { UpsertPredictionDto } from "./dto/upsert-prediction.dto";
import { PredictionsService } from "./predictions.service";

@ApiTags("Predictions")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("predictions")
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) {}

  @Get("me")
  findMine(@CurrentUser() user: RequestUser) {
    return this.predictionsService.findMine(user.id);
  }

  @Post(":matchId")
  create(
    @CurrentUser() user: RequestUser,
    @Param("matchId") matchId: string,
    @Body() dto: UpsertPredictionDto
  ) {
    return this.predictionsService.create(user.id, matchId, dto);
  }

  @Put(":matchId")
  update(
    @CurrentUser() user: RequestUser,
    @Param("matchId") matchId: string,
    @Body() dto: UpsertPredictionDto
  ) {
    return this.predictionsService.update(user.id, matchId, dto);
  }
}
