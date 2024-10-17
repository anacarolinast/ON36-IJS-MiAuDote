import { PartialType } from '@nestjs/mapped-types';
import { CreateAdotanteDto } from './create-adotante.dto';
import { IsOptional} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdotanteDto extends PartialType(CreateAdotanteDto) {
    @ApiProperty()
    @IsOptional()
    id?: number;
}
