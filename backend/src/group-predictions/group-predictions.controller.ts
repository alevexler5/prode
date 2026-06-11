import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser, RequestUser } from "../common/decorators/current-user.decorator";
import { AdminGuard } from "../common/guards/admin.guard";
import { UpsertGroupPredictionsDto } from "./dto/upsert-group-predictions.dto";
import { UpsertStandingsDto } from "./dto/upsert-standings.dto";
import { GroupPredictionsService } from "./group-predictions.service";

@ApiTags("Group Predictions")
@Controller("group-predictions")
export class GroupPredictionsController {
  constructor(private readonly groupPredictionsService: GroupPredictionsService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findMine(@CurrentUser() user: RequestUser) {
    return this.groupPredictionsService.findMine(user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@CurrentUser() user: RequestUser, @Body() dto: UpsertGroupPredictionsDto) {
    return this.groupPredictionsService.upsertMine(user.id, dto);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@CurrentUser() user: RequestUser, @Body() dto: UpsertGroupPredictionsDto) {
    return this.groupPredictionsService.upsertMine(user.id, dto);
  }

  @Post("calculate")
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  calculate(@CurrentUser() user: RequestUser, @Body() dto: UpsertStandingsDto) {
    return this.groupPredictionsService.upsertStandingsAndCalculate(dto, user.id);
  }
}
