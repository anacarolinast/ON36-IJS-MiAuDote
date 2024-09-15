import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Castracao } from './entities/castracao.entity';
import { CreateCastracaoDto } from './dto/create-castracao.dto';
import { UpdateCastracaoDto } from './dto/update-castracao.dto';

@Injectable()
export class CastracoesService {
  constructor(
    @InjectRepository(Castracao)
    private readonly castracoesRepository: Repository<Castracao>,
  ) {}

  async findAll(): Promise<Castracao[]> {
    return this.castracoesRepository.find();
  }

  async findOne(id: number): Promise<Castracao> {
    const castracao = await this.castracoesRepository.findOne({ where: { id } });
    if (!castracao) {
      throw new NotFoundException(`Castracao with ID ${id} not found`);
    }
    return castracao;
  }

  async create(createCastracaoDto: CreateCastracaoDto): Promise<Castracao> {
    const newCastracao = this.castracoesRepository.create(createCastracaoDto);
    return this.castracoesRepository.save(newCastracao);
  }

  async update(id: number, updateCastracaoDto: UpdateCastracaoDto): Promise<Castracao> {
    const castracao = await this.findOne(id);
    const updatedCastracao = Object.assign(castracao, updateCastracaoDto);
    return this.castracoesRepository.save(updatedCastracao);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const castracao = await this.findOne(id);
    await this.castracoesRepository.remove(castracao);
    return { deleted: true };
  }
}
