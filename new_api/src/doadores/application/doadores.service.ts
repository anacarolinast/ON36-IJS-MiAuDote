import { Injectable, NotFoundException } from '@nestjs/common';
import { Doador } from '../domain/doadores';
import { CreateDoadorDto } from '../presenters/http/dto/create-doador.dto';
import { UpdateDoadorDto } from '../presenters/http/dto/update-doador.dto';
import { DoadorFactory } from '../domain/factories/doadores-factory';
import { DoadorRepository } from './ports/doador.repository';

@Injectable()
export class DoadoresService {
  constructor(
    private readonly doadorFactory: DoadorFactory,
    private readonly doadorRepository: DoadorRepository,
  ) {}

  async findAll(): Promise<Doador[]> {
    return this.doadorRepository.findAll();
  }

  async findOne(id: number): Promise<Doador> {
    const doador = await this.doadorRepository.findById(id);
    if (!doador) {
      throw new NotFoundException(`Doador with ID ${id} not found`);
    }
    return doador;
  }

  async create(createDoadorDto: CreateDoadorDto): Promise<Doador> {
    const newDoador = this.doadorFactory.create(createDoadorDto);
    return this.doadorRepository.save(newDoador);
  }

  async update(id: number, updateDoadorDto: UpdateDoadorDto): Promise<Doador> {
    const doador = await this.findOne(id);

    const updatedDoadorData = {
      tipo_doacao: updateDoadorDto.tipo_doacao ?? doador.tipo_doacao,
      descricao: updateDoadorDto.descricao ?? doador.descricao,
      pessoa_id: updateDoadorDto.pessoa_id ?? doador.pessoa_id,
    };

    const updatedDoador = this.doadorFactory.create(updatedDoadorData);

    await this.doadorRepository.update(id, updatedDoador);
    return updatedDoador;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.doadorRepository.remove(id);
    return { deleted: true };
  }
}
