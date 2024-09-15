import { IsNumber, IsDate, IsString, Length, Min } from 'class-validator';

export class CreateAdocaoDto {
    @IsNumber()
    @Min(1) 
    adotante_id: number;

    @IsNumber()
    @Min(1)  
    animal_id: number;

    @IsDate()  
    data_adocao: Date;

    @IsString()
    @Length(0, 255) 
    condicoes_especiais: string;

    @IsString()
    @Length(1, 255)
    status_aprovacao: string;
}
