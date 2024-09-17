import { Injectable, NotFoundException } from '@nestjs/common';
import { Adocao } from '../domain/adocao';
import { CreateAdocaoDto } from '../presenters/http/dto/create-adocao.dto';
import { UpdateAdocaoDto } from '../presenters/http/dto/update-adocao.dto';
import { AdocaoFactory } from '../domain/factories/adocoes-factory';
import { AdocaoRepository } from './ports/adocoes.repository';

@Injectable()
export class AdocoesService {
  constructor(
    private readonly adocaoFactory: AdocaoFactory,
    private readonly adocaoRepository: AdocaoRepository,
  ) {}

  async findAll(): Promise<Adocao[]> {
    return this.adocaoRepository.findAll();
  }

  async findOne(id: number): Promise<Adocao> {
    const adocao = await this.adocaoRepository.findById(id);
    if (!adocao) {
      throw new NotFoundException(`Adocao with ID ${id} not found`);
    }
    return adocao;
  }

  async create(createAdocaoDto: CreateAdocaoDto): Promise<Adocao> {
    const newAdocao = this.adocaoFactory.create(createAdocaoDto);
    return this.adocaoRepository.save(newAdocao);
  }

  async update(id: number, updateAdocaoDto: UpdateAdocaoDto): Promise<Adocao> {
    const adocao = await this.findOne(id);

    const updatedAdocaoData = {
      adotante_id: updateAdocaoDto.adotante_id ?? adocao.adotante_id,
      animal_id: updateAdocaoDto.animal_id ?? adocao.animal_id,
      data_adocao: updateAdocaoDto.data_adocao ?? adocao.data_adocao,
      condicoes_especiais: updateAdocaoDto.condicoes_especiais ?? adocao.condicoes_especiais,
      status_aprovacao: updateAdocaoDto.status_aprovacao ?? adocao.status_aprovacao
    };

    const updatedAdocao = this.adocaoFactory.create(updatedAdocaoData);

    await this.adocaoRepository.update(id, updatedAdocao);
    return updatedAdocao;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.adocaoRepository.remove(id);
    return { deleted: true };
  }
}
