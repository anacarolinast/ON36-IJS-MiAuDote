import { Injectable } from '@nestjs/common';
import { CreateAdocaoDto } from './dto/create-adocao.dto';
import { UpdateAdocaoDto } from './dto/update-adocao.dto';

@Injectable()
export class AdocoesService {
  create(createAdocaoDto: CreateAdocaoDto) {
    return 'This action adds a new adocao';
  }

  findAll() {
    return `This action returns all adocoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adocao`;
  }

  update(id: number, updateAdocaoDto: UpdateAdocaoDto) {
    return `This action updates a #${id} adocao`;
  }

  remove(id: number) {
    return `This action removes a #${id} adocao`;
  }
}
