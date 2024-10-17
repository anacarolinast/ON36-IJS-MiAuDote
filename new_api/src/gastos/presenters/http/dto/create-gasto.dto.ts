import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateGastoDto {
    @ApiProperty()
    @IsDate()  
    @Type(() => Date)
    data_gasto: Date;

    @ApiProperty()
    @IsString()
    @Length(1, 255) 
    tipo: string;

    @ApiProperty()
    @IsNumber()
    @Min(0) 
    quantidade: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)  
    valor: number;
}
