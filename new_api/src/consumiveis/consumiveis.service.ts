import { Injectable } from '@nestjs/common';
import { CreateConsumiveiDto } from './dto/create-consumivei.dto';
import { UpdateConsumiveiDto } from './dto/update-consumivei.dto';

@Injectable()
export class ConsumiveisService {
  create(createConsumiveiDto: CreateConsumiveiDto) {
    return 'This action adds a new consumivei';
  }

  findAll() {
    return `This action returns all consumiveis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consumivei`;
  }

  update(id: number, updateConsumiveiDto: UpdateConsumiveiDto) {
    return `This action updates a #${id} consumivei`;
  }

  remove(id: number) {
    return `This action removes a #${id} consumivei`;
  }
}
