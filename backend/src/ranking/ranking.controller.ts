import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RankingService } from "./ranking.service";

@ApiTags("Ranking")
@Controller("ranking")
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  findAll() {
    return this.rankingService.findAll();
  }

  @Get(":userId")
  findOne(@Param("userId") userId: string) {
    return this.rankingService.findOne(userId);
  }
}
