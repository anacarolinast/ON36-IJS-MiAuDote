import { PartialType } from '@nestjs/mapped-types';
import { CreateDoacaoDto } from './create-doacao.dto';
import { IsOptional } from 'class-validator';

export class UpdateDoacaoDto extends PartialType(CreateDoacaoDto) {
    @IsOptional()
    id?: number;
}
