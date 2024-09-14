import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumiveiDto } from './create-consumivei.dto';

export class UpdateConsumiveiDto extends PartialType(CreateConsumiveiDto) {}
