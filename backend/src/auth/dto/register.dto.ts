import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: "Lionel" })
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: "lionel@example.com" })
  @Transform(({ value }) => String(value).trim().toLowerCase())
  @IsEmail()
  email: string;

  @ApiProperty({ example: "super-secret-123", minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;
}
