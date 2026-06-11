import { ApiPropertyOptional } from "@nestjs/swagger";
import { MatchStatus } from "@prisma/client";
import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateMatchDto {
  @ApiPropertyOptional({ example: "2026-06-11T19:00:00.000Z" })
  @IsOptional()
  @IsDateString()
  kickoff?: string;

  @ApiPropertyOptional({ example: "Ciudad de Mexico" })
  @IsOptional()
  @IsString()
  @MinLength(2)
  venue?: string;

  @ApiPropertyOptional({ example: "Estadio Azteca" })
  @IsOptional()
  @IsString()
  @MinLength(2)
  stadium?: string;

  @ApiPropertyOptional({ enum: MatchStatus })
  @IsOptional()
  @IsEnum(MatchStatus)
  status?: MatchStatus;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPredictionEnabled?: boolean;
}
