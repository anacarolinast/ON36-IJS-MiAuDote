import { IsNumber, IsString, Min, Length } from 'class-validator';

export class CreateAdotanteDto {
    @IsNumber()
    @Min(0) 
    renda: number;

    @IsString()
    @Length(1, 255) 
    condicao_entrevista: string;

    @IsNumber()
    @Min(1)
    pessoa_id: number;
}
