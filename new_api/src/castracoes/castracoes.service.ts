import { Injectable } from '@nestjs/common';
import { CreateCastracaoDto } from './dto/create-castracao.dto';
import { UpdateCastracaoDto } from './dto/update-castracao.dto';

@Injectable()
export class CastracoesService {
  create(createCastracaoDto: CreateCastracaoDto) {
    return 'This action adds a new castracao';
  }

  findAll() {
    return `This action returns all castracoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} castracao`;
  }

  update(id: number, updateCastracaoDto: UpdateCastracaoDto) {
    return `This action updates a #${id} castracao`;
  }

  remove(id: number) {
    return `This action removes a #${id} castracao`;
  }
}
