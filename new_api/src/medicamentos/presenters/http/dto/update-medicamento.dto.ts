import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicamentoDto } from './create-medicamento.dto';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMedicamentoDto extends PartialType(CreateMedicamentoDto) {
    @ApiProperty()
    @IsOptional()
    id?: number;
}
