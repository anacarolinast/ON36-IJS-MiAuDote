import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Doacao } from './entities/doacao.entity';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';

@Injectable()
export class DoacoesService {
  constructor(
    @InjectRepository(Doacao)
    private readonly doacaoRepository: Repository<Doacao>,
  ) {}

  async findAll(): Promise<Doacao[]> {
    return this.doacaoRepository.find();
  }

  async findOne(id: number): Promise<Doacao> {
    const doacao = await this.doacaoRepository.findOne({
      where: { id },
    });

    if (!doacao) {
      throw new NotFoundException(`Doação com ID ${id} não encontrada.`);
    }

    return doacao;
  }

  async create(createDoacaoDto: CreateDoacaoDto): Promise<Doacao> {
    const newDoacao = this.doacaoRepository.create(createDoacaoDto);
    return this.doacaoRepository.save(newDoacao);
  }

  async update(id: number, updateDoacaoDto: UpdateDoacaoDto): Promise<Doacao> {
    const doacao = await this.doacaoRepository.preload({
      id,
      ...updateDoacaoDto,
    });

    if (!doacao) {
      throw new NotFoundException(`Doação com ID ${id} não encontrada.`);
    }

    return this.doacaoRepository.save(doacao);
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.doacaoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Doação com ID ${id} não encontrada.`);
    }

    return result;
  }
}
