import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Max, Min } from "class-validator";

export class UpdateResultDto {
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
