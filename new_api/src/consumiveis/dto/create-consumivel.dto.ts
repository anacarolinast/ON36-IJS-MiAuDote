import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateConsumivelDto {
    @IsString()
    @Length(1, 255)  
    tipo_animal: string;

    @IsString()
    @Length(1, 255)  
    descricao: string;

    @IsNumber()
    @Min(1)  
    gasto_id: number;
}
