import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminUpdateResultDto } from "./dto/admin-update-result.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser, RequestUser } from "../common/decorators/current-user.decorator";
import { AdminGuard } from "../common/guards/admin.guard";
import { ConfirmMatchDto } from "./dto/confirm-match.dto";
import { MatchQueryDto } from "./dto/match-query.dto";
import { UpdateResultDto } from "./dto/update-result.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";
import { MatchesService } from "./matches.service";

@ApiTags("Matches")
@Controller("matches")
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  findAll(@Query() query: MatchQueryDto) {
    return this.matchesService.findAll(query);
  }

  @Get("available-for-prediction")
  findAvailableForPrediction() {
    return this.matchesService.findAvailableForPrediction();
  }

  @Get("admin/summary")
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Resumen admin para operacion del torneo" })
  getAdminSummary() {
    return this.matchesService.getAdminSummary();
  }

  @Get("admin/pending-results")
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Lista partidos confirmados para cargar o corregir resultados" })
  getPendingResults() {
    return this.matchesService.getPendingResults();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.matchesService.findByIdOrThrow(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  updateMatch(@CurrentUser() user: RequestUser, @Param("id") id: string, @Body() dto: UpdateMatchDto) {
    return this.matchesService.updateMatch(id, dto, user.id);
  }

  @Post(":id/confirm")
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  confirm(@CurrentUser() user: RequestUser, @Param("id") id: string, @Body() dto: ConfirmMatchDto) {
    return this.matchesService.confirmMatch(id, dto, user.id);
  }

  @Post("admin/result")
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Cargar resultado real enviando matchId en el body" })
  updateResultFromBody(@CurrentUser() user: RequestUser, @Body() dto: AdminUpdateResultDto) {
    return this.matchesService.updateResult(
      dto.matchId,
      { homeScore: dto.homeScore, awayScore: dto.awayScore },
      user.id
    );
  }

  @Post(":id/result")
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Cargar resultado real de un partido por id" })
  updateResult(@CurrentUser() user: RequestUser, @Param("id") id: string, @Body() dto: UpdateResultDto) {
    return this.matchesService.updateResult(id, dto, user.id);
  }
}
