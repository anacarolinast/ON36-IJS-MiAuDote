import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsString, Length } from 'class-validator';

enum EstadoAdocao {
    DISPONIVEL = 'disponivel',
    ADOTADO = 'adotado',
    INDISPONIVEL = 'indisponivel',
    FALECEU = 'faleceu'
  }

export class CreateAnimalDto {
    @ApiProperty()  
    @IsString()
    @Length(1, 255)
    nome: string;

    @ApiProperty()
    @IsString()
    @Length(1, 255)  
    especie: string;

    @ApiProperty()
    @IsString()
    @Length(1)   
    sexo: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    data_nascimento: Date;

    @ApiProperty()
    @IsString()
    @Length(1, 255) 
    condicao_saude: string;
    
    @ApiProperty()
    @IsEnum(EstadoAdocao, { message: 'O estado de adoção deve ser um valor válido: disponivel, adotado, em_processo.' })
    @IsString()
    @Length(1, 255)  
    estado_adocao: string;
}
