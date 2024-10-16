import { Type } from 'class-transformer';
import { IsNumber, IsDate, IsString, Length, Min } from 'class-validator';
import { CreateGastoDto } from '../../../../gastos/presenters/http/dto/create-gasto.dto';

export class CreateVacinaDto extends CreateGastoDto {
    @IsNumber()
    @Min(1)
    animal_id: number;

    @IsDate()
    @Type(() => Date)
    data_vacinacao: Date;

    @IsString()
    @Length(1, 255)
    tipo_vacina: string;

    @IsNumber()
    @Min(1) 
    veterinario_id: number;
}
