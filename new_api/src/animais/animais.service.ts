import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimaisService {
  create(createAnimalDto: CreateAnimalDto) {
    return 'This action adds a new animal';
  }

  findAll() {
    return `This action returns all animais`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animal`;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }
}
