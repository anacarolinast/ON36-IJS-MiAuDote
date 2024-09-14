import { IsNumber, IsDate, IsString, Length, Min } from 'class-validator';

export class CreateCastracaoDto {
    @IsNumber()
    @Min(1)
    animal_id: number;

    @IsDate()  
    data_castracao: Date;

    @IsString()
    @Length(1, 255)  
    condicao_pos: string;

    @IsNumber()
    @Min(1)  
    veterinario_id: number;

    @IsNumber()
    @Min(1)  
    gasto_id: number;
}
