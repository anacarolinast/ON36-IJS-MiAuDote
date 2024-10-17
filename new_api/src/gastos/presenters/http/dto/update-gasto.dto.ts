import { PartialType } from '@nestjs/mapped-types';
import { CreateGastoDto } from './create-gasto.dto';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGastoDto extends PartialType(CreateGastoDto) {
    @ApiProperty()
    @IsOptional()
    id?: number;
}
