import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoaDto } from './create-pessoa.dto';
import { IsOptional} from 'class-validator'

export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {
    @IsOptional()
    id?: number;
}
