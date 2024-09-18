import { IsNumber, IsDate, IsString, Length, Min } from 'class-validator';

export class CreateVacinaDto {
    @IsNumber()
    @Min(1)
    animal_id: number;

    @IsDate()
    data_vacinacao: Date;

    @IsString()
    @Length(1, 255)
    tipo_vacina: string;

    @IsNumber()
    @Min(1) 
    veterinario_id: number;

    @IsNumber()
    @Min(1)
    gasto_id: number;
}
