import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class GroupPickDto {
  @ApiProperty({ example: "A" })
  @IsString()
  group: string;

  @ApiProperty({ example: "Argentina" })
  @IsString()
  predictedFirstTeam: string;

  @ApiProperty({ example: "Mexico" })
  @IsString()
  predictedSecondTeam: string;
}

export class UpsertGroupPredictionsDto {
  @ApiProperty({ type: [GroupPickDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupPickDto)
  groups: GroupPickDto[];

  @ApiProperty({ example: ["Chile", "Uruguay", "Japan", "Senegal", "Croatia", "Canada", "Morocco", "Korea"] })
  @IsArray()
  @ArrayMinSize(8)
  @ArrayMaxSize(8)
  @IsString({ each: true })
  bestThirds: string[];
}
