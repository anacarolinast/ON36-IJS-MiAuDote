import { PartialType } from '@nestjs/mapped-types';
import { CreateVeterinarioDto } from './create-veterinario.dto';
import { IsOptional } from 'class-validator';

export class UpdateVeterinarioDto extends PartialType(CreateVeterinarioDto) {
    @IsOptional()
    id?: number;
}
