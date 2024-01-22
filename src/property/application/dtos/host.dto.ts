import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `host id` })
  readonly _id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `host name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `host lastname` })
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `host ciudad` })
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `host pais` })
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'El formato del email no es válido' })
  @ApiProperty({ description: `host email` })
  readonly email: string;
}
