import { PartialType } from '@nestjs/mapped-types';
import { CreateAdotanteDto } from './create-adotante.dto';
import { IsOptional} from 'class-validator'

export class UpdateAdotanteDto extends PartialType(CreateAdotanteDto) {
    @IsOptional()
    id?: number;
}
