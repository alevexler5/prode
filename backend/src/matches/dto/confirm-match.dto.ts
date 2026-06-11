import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class ConfirmMatchDto {
  @ApiProperty({ example: "Argentina" })
  @IsString()
  @MinLength(2)
  homeTeam: string;

  @ApiProperty({ example: "Mexico" })
  @IsString()
  @MinLength(2)
  awayTeam: string;
}
