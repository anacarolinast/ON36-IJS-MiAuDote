import { PartialType } from '@nestjs/mapped-types';
import { CreateAdocaoDto } from './create-adocao.dto';
import { IsOptional } from 'class-validator';

export class UpdateAdocaoDto extends PartialType(CreateAdocaoDto) {
    @IsOptional()
    id?: number;
}
