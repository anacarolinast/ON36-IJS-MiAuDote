import { PartialType } from '@nestjs/mapped-types';
import { CreateCastracaoDto } from './create-castracao.dto';
import { IsOptional } from 'class-validator';

export class UpdateCastracaoDto extends PartialType(CreateCastracaoDto) {
    @IsOptional()
    id?: number;
}
