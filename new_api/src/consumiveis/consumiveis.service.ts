import { Injectable } from '@nestjs/common';
import { CreateConsumivelDto } from './dto/create-consumivel.dto';
import { UpdateConsumivelDto } from './dto/update-consumivel.dto';

@Injectable()
export class ConsumiveisService {
  create(createConsumivelDto: CreateConsumivelDto) {
    return 'This action adds a new consumivel';
  }

  findAll() {
    return `This action returns all consumiveis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consumivel`;
  }

  update(id: number, updateConsumivelDto: UpdateConsumivelDto) {
    return `This action updates a #${id} consumivel`;
  }

  remove(id: number) {
    return `This action removes a #${id} consumivel`;
  }
}
