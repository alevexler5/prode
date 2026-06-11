import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Max, Min } from "class-validator";

export class AdminUpdateResultDto {
  @ApiProperty({ example: "match-001" })
  @IsString()
  matchId: string;

  @ApiProperty({ example: 2, minimum: 0 })
  @IsInt()
  @Min(0)
  @Max(30)
  homeScore: number;

  @ApiProperty({ example: 1, minimum: 0 })
  @IsInt()
  @Min(0)
  @Max(30)
  awayScore: number;
}
