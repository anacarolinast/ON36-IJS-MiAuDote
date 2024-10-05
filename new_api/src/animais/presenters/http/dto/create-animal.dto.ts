import { Type } from 'class-transformer';
import { IsDate, IsString, Length } from 'class-validator';

export class CreateAnimalDto {
    @IsString()
    @Length(1, 255)
    nome: string;

    @IsString()
    @Length(1, 255)  
    especie: string;

    @IsString()
    @Length(1)   
    sexo: string;

    @IsDate()
    @Type(() => Date)
    data_nascimento: Date;

    @IsString()
    @Length(1, 255) 
    condicao_saude: string;

    @IsString()
    @Length(1, 255)  
    estado_adocao: string;
}
