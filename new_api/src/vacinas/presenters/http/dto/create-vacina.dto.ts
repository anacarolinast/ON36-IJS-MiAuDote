import { Type } from 'class-transformer';
import { IsNumber, IsDate, IsString, Length, Min } from 'class-validator';
import { CreateGastoDto } from '../../../../gastos/presenters/http/dto/create-gasto.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVacinaDto extends CreateGastoDto {
    @ApiProperty()
    @IsNumber()
    @Min(1)
    animal_id: number;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    data_vacinacao: Date;

    @ApiProperty()
    @IsString()
    @Length(1, 255)
    tipo_vacina: string;

    @ApiProperty()
    @IsNumber()
    @Min(1) 
    veterinario_id: number;
}
