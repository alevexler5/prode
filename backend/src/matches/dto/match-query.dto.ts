import { ApiPropertyOptional } from "@nestjs/swagger";
import { MatchPhase, MatchStatus } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class MatchQueryDto {
  @ApiPropertyOptional({ enum: MatchPhase })
  @IsOptional()
  @IsEnum(MatchPhase)
  phase?: MatchPhase;

  @ApiPropertyOptional({ example: "A" })
  @IsOptional()
  @IsString()
  group?: string;

  @ApiPropertyOptional({ enum: MatchStatus })
  @IsOptional()
  @IsEnum(MatchStatus)
  status?: MatchStatus;

  @ApiPropertyOptional({ example: "Argentina" })
  @IsOptional()
  @IsString()
  team?: string;
}
