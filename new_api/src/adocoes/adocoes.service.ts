import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adocao } from './entities/adocao.entity';
import { CreateAdocaoDto } from './dto/create-adocao.dto';
import { UpdateAdocaoDto } from './dto/update-adocao.dto';

@Injectable()
export class AdocoesService {
  constructor(
    @InjectRepository(Adocao)
    private readonly adocaoRepository: Repository<Adocao>,
  ) {}

  async create(createAdocaoDto: CreateAdocaoDto): Promise<Adocao> {
    const adocao = this.adocaoRepository.create(createAdocaoDto);
    return this.adocaoRepository.save(adocao);
  }

  async findAll(): Promise<Adocao[]> {
    return this.adocaoRepository.find();
  }

  async findOne(id: number): Promise<Adocao> {
    return this.adocaoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAdocaoDto: UpdateAdocaoDto): Promise<Adocao> {
    await this.adocaoRepository.update(id, updateAdocaoDto);
    return this.adocaoRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<{ id: number }> {
    await this.adocaoRepository.delete(id);
    return { id };
  }
}
