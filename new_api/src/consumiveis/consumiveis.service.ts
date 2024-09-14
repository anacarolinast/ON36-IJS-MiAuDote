import { Injectable } from '@nestjs/common';
import { CreateConsumivelDto } from './dto/create-consumivel.dto';
import { UpdateConsumivelDto } from './dto/update-consumivel.dto';

@Injectable()
export class ConsumiveisService {
  create(createConsumivelDto: CreateConsumivelDto) {
    return 'This action adds a new consumivei';
  }

  findAll() {
    return `This action returns all consumiveis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consumivei`;
  }

  update(id: number, updateConsumivelDto: UpdateConsumivelDto) {
    return `This action updates a #${id} consumivei`;
  }

  remove(id: number) {
    return `This action removes a #${id} consumivei`;
  }
}
