import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicamentoDto } from './create-medicamento.dto';
import { IsOptional } from 'class-validator';

export class UpdateMedicamentoDto extends PartialType(CreateMedicamentoDto) {
    @IsOptional()
    id?: number;
}
