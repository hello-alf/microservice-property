import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `address street` })
  readonly street: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `address number` })
  readonly number: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `address city` })
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `address country code` })
  readonly countryCode: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `address latitude` })
  readonly latitude: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `address longitude` })
  readonly longitude: number;
}
