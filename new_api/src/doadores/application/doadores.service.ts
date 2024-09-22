import { Injectable, NotFoundException } from '@nestjs/common';
import { Doador } from '../domain/doadores';
import { CreateDoadorDto } from '../presenters/http/dto/create-doador.dto';
import { UpdateDoadorDto } from '../presenters/http/dto/update-doador.dto';
import { DoadorFactory } from '../domain/factories/doadores-factory';
import { DoadorRepository } from './ports/doador.repository';
import { PessoaRepository } from 'src/pessoas/application/ports/pessoas.repository';

@Injectable()
export class DoadoresService {
  constructor(
    private readonly doadorFactory: DoadorFactory,
    private readonly doadorRepository: DoadorRepository,
    private readonly pessoaRepository: PessoaRepository,
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
    const pessoa = await this.pessoaRepository.findById(
      createDoadorDto.pessoa_id,
    );
    if (!pessoa){
      throw new NotFoundException(
        `Pessoa with ID ${createDoadorDto.pessoa_id} not found`,
      );
    }
    
    const newDoador = this.doadorFactory.create(createDoadorDto, pessoa);
    return this.doadorRepository.save(newDoador);
  }

  async update(
    id: number,
    updateDoadorDto: UpdateDoadorDto
  ): Promise<Doador> {
    const doador = await this.findOne(id);
    const updatedDoadorData = {
      tipo_doacao: updateDoadorDto.tipo_doacao ?? doador.tipo_doacao,
      descricao: updateDoadorDto.descricao ?? doador.descricao,
      pessoa_id: updateDoadorDto.pessoa_id ?? doador.pessoa_id,
    };

    const pessoa = await this.pessoaRepository.findById(updatedDoadorData.pessoa_id);
    if (!pessoa) {
      throw new NotFoundException(`Pessoa with ID ${updatedDoadorData.pessoa_id} not found`);
    }

    const updatedDoador = this.doadorFactory.create(updatedDoadorData, pessoa);

    const result = await this.doadorRepository.update(id, updatedDoador);
    if (!result) {
      throw new NotFoundException(`Doador with ID ${id} not found for update.`);
    }

    return updatedDoador;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.doadorRepository.remove(id);
    return { deleted: true };
  }
}
