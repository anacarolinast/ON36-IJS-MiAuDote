import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateGastoDto {
    @IsDate()  
    @Type(() => Date)
    data_gasto: Date;

    @IsString()
    @Length(1, 255) 
    tipo: string;

    @IsNumber()
    @Min(0) 
    quantidade: number;

    @IsNumber()
    @Min(0)  
    valor: number;
}
