import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UsersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
 
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsOptional()
  readonly password: string;
}
