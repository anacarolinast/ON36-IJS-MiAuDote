import { PartialType } from '@nestjs/mapped-types';
import { CreateCastracaoDto } from './create-castracao.dto';

export class UpdateCastracaoDto extends PartialType(CreateCastracaoDto) {}
