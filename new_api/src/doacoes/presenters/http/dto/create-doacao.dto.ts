import { Type } from 'class-transformer';
import { IsNumber, IsDate, IsString, Length, Min } from 'class-validator';

export class CreateDoacaoDto {
    @IsNumber()
    @Min(1)  
    doador_id: number;

    @IsDate() 
    @Type(() => Date)
    data_doacao: Date;

    @IsString()
    @Length(1, 255)  
    tipo_doacao: string;

    @IsNumber()
    @Min(0)  
    valor_estimado: number;

    @IsNumber()
    @Min(1)  
    gasto_id: number;
}
