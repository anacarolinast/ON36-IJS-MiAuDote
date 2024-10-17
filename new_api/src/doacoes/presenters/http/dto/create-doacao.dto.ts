import { Type } from 'class-transformer';
import { IsNumber, IsDate, IsString, Length, Min, Max } from 'class-validator';
import { CreateGastoDto } from '../../../../gastos/presenters/http/dto/create-gasto.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoacaoDto extends CreateGastoDto {
    @ApiProperty()
    @IsNumber()
    @Min(1)  
    doador_id: number;

    @ApiProperty()
    @IsDate() 
    @Type(() => Date)
    data_doacao: Date;

    @ApiProperty()
    @IsString()
    @Length(1, 255)  
    tipo_doacao: string;

    @ApiProperty()
    @IsNumber()
    @Max(0)  
    valor_estimado: number;
}
