import { IsNumber, IsDate, IsString, Length, Min } from 'class-validator';

export class CreateMedicamentoDto {
    @IsNumber()
    @Min(1)  
    animal_id: number;

    @IsDate()  
    data_compra: Date;

    @IsString()
    @Length(1, 255) 
    descricao: string;

    @IsNumber()
    @Min(1)  
    veterinario_id: number;

    @IsNumber()
    @Min(1)  
    gasto_id: number;
}
