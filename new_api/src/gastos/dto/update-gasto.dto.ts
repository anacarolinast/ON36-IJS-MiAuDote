import { PartialType } from '@nestjs/mapped-types';
import { CreateGastoDto } from './create-gasto.dto';
import { IsOptional } from 'class-validator';

export class UpdateGastoDto extends PartialType(CreateGastoDto) {
    @IsOptional()
    id?: number;
}
