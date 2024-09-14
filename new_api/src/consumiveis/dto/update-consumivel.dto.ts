import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumivelDto } from './create-consumivel.dto';
import { IsOptional } from 'class-validator';

export class UpdateConsumivelDto extends PartialType(CreateConsumivelDto) {
    @IsOptional()
    id?: number;
}
