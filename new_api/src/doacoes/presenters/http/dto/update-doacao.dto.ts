import { PartialType } from '@nestjs/mapped-types';
import { CreateDoacaoDto } from './create-doacao.dto';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDoacaoDto extends PartialType(CreateDoacaoDto) {
    @ApiProperty()
    @IsOptional()
    id?: number;
}
