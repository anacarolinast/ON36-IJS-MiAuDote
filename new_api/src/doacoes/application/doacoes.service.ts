import { Injectable, NotFoundException } from '@nestjs/common';
import { Doacao } from '../domain/doacoes';
import { CreateDoacaoDto } from '../presenters/http/dto/create-doacao.dto';
import { UpdateDoacaoDto } from '../presenters/http/dto/update-doacao.dto';
import { DoacaoFactory } from '../domain/factories/doacoes-factory';
import { DoacaoRepository } from './ports/doacao.repository';

@Injectable()
export class DoacoesService {
  constructor(
    private readonly doacaoFactory: DoacaoFactory,
    private readonly doacaoRepository: DoacaoRepository,
  ) {}

  async findAll(): Promise<Doacao[]> {
    return this.doacaoRepository.findAll();
  }

  async findOne(id: number): Promise<Doacao> {
    const doacao = await this.doacaoRepository.findById(id);
    if (!doacao) {
      throw new NotFoundException(`Doacao with ID ${id} not found`);
    }
    return doacao;
  }

  async create(createDoacaoDto: CreateDoacaoDto): Promise<Doacao> {
    const newDoacao = this.doacaoFactory.create(createDoacaoDto);
    return this.doacaoRepository.save(newDoacao);
  }

  async update(id: number, updateDoacaoDto: UpdateDoacaoDto): Promise<Doacao> {
    const doacao = await this.findOne(id);

    const updatedDoacaoData = {
      doador_id: updateDoacaoDto.doador_id ?? doacao.doador_id,
      data_doacao: updateDoacaoDto.data_doacao ?? doacao.data_doacao,
      tipo_doacao: updateDoacaoDto.tipo_doacao ?? doacao.tipo_doacao,
      valor_estimado: updateDoacaoDto.valor_estimado ?? doacao.valor_estimado,
      gasto_id: updateDoacaoDto.gasto_id ?? doacao.gasto_id
    };

    const updatedDoacao = this.doacaoFactory.create(updatedDoacaoData);

    await this.doacaoRepository.update(id, updatedDoacao);
    return updatedDoacao;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.doacaoRepository.remove(id);
    return { deleted: true };
  }
}
