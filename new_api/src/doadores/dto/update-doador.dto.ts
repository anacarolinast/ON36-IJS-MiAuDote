import { PartialType } from '@nestjs/mapped-types';
import { CreateDoadorDto } from './create-doador.dto';
import { IsOptional } from 'class-validator';

export class UpdateDoadorDto extends PartialType(CreateDoadorDto) {
    @IsOptional()
    id?: number;
}
