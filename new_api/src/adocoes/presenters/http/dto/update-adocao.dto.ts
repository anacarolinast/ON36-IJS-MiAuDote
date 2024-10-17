import { PartialType } from '@nestjs/mapped-types';
import { CreateAdocaoDto } from './create-adocao.dto';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdocaoDto extends PartialType(CreateAdocaoDto) {
    @ApiProperty()
    @IsOptional()
    id?: number;
}
