import { PartialType } from '@nestjs/mapped-types';
import { CreateDoadoreDto } from './create-doadore.dto';

export class UpdateDoadoreDto extends PartialType(CreateDoadoreDto) {}
