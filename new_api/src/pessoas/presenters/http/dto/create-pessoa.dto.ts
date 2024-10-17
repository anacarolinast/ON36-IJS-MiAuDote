import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreatePessoaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  nome: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  cep: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  endereco: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  telefone: string[];

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 255)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  cpf: string;
}
