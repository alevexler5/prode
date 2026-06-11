import { ApiProperty } from "@nestjs/swagger";
import { QualifiedAs } from "@prisma/client";
import { IsArray, IsEnum, IsInt, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class StandingDto {
  @ApiProperty({ example: "A" })
  @IsString()
  group: string;

  @ApiProperty({ example: "Argentina" })
  @IsString()
  team: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  position: number;

  @ApiProperty({ example: 7 })
  @IsInt()
  points: number;

  @ApiProperty({ example: 4 })
  @IsInt()
  goalDifference: number;

  @ApiProperty({ example: 6 })
  @IsInt()
  goalsFor: number;

  @ApiProperty({ enum: QualifiedAs, example: QualifiedAs.group_winner })
  @IsEnum(QualifiedAs)
  qualifiedAs: QualifiedAs;
}

export class UpsertStandingsDto {
  @ApiProperty({ type: [StandingDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StandingDto)
  standings: StandingDto[];
}
