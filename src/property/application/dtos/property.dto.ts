import {
  IsArray,
  IsEnum,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateNested,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import PropertyType from 'src/property/domain/model/type.enum';
import { AddressDto } from './address.dto';
import AmenityEnum from 'src/property/domain/model/amenities.enum';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `property name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `property description` })
  readonly description: string;

  @IsEnum(PropertyType, { each: true })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `property type` })
  readonly propertyType: string;

  @IsEnum(AmenityEnum, { each: true })
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: `amenities` })
  readonly amenities: AmenityEnum[];

  @IsDefined()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `capacity` })
  readonly capacity: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `rooms` })
  readonly rooms: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `beds` })
  readonly beds: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `bathrooms` })
  readonly bathrooms: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `price` })
  readonly pricePerNight: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `property host` })
  readonly host: string;
}
