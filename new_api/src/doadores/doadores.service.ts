import { Injectable } from '@nestjs/common';
import { CreateDoadoreDto } from './dto/create-doadore.dto';
import { UpdateDoadoreDto } from './dto/update-doadore.dto';

@Injectable()
export class DoadoresService {
  create(createDoadoreDto: CreateDoadoreDto) {
    return 'This action adds a new doadore';
  }

  findAll() {
    return `This action returns all doadores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doadore`;
  }

  update(id: number, updateDoadoreDto: UpdateDoadoreDto) {
    return `This action updates a #${id} doadore`;
  }

  remove(id: number) {
    return `This action removes a #${id} doadore`;
  }
}
