import { VacinaFactory } from './../domain/factories/vacinas-factory';
import { VacinaRepository } from '../application/ports/vacinas.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Vacina } from '../domain/vacinas';

@Injectable()
export class VacinasService {
  constructor (
    private readonly vacinaRepository: VacinaRepository,
    private readonly vacinaFactory: VacinaFactory,
  ) {}

  async findAll(): Promise<Vacina[]> {
    return this.vacinaRepository.findAll();
  }

  async findOne(id: number): Promise<Vacina> {
    const vacina = await this.vacinaRepository.findById(id);
    if (!vacina) {
      throw new NotFoundException(`Vacina with ID ${id} not found`);
    }
    return vacina;
  }

  async create(createVacinaDto: any): Promise<Vacina> {
    const newVacina = this.vacinaFactory.create(createVacinaDto);
    return this.vacinaRepository.save(newVacina);
  }

  async update(id: number, updateVacinaDto: any): Promise<Vacina> {
    const vacina = await this.findOne(id);

    const updatedVacinaData = {
      animal_id: updateVacinaDto.animal_id ?? vacina.animal_id,
      data_vacinacao: updateVacinaDto.data_vacinacao ?? vacina.data_vacinacao,
      tipo_vacina: updateVacinaDto.tipo_vacina ?? vacina.tipo_vacina,
      veterinario_id: updateVacinaDto.veterinario_id ?? vacina.veterinario_id,
      gasto_id: updateVacinaDto.gasto_id ?? vacina.gasto_id,
      // animal: updateVacinaDto.animal ?? vacina.animal,
      // veterinario: updateVacinaDto.veterinario ?? vacina.veterinario,
      // gasto: updateVacinaDto.gasto ?? vacina.gasto,
    };

    const updatedVacina = this.vacinaFactory.create(updatedVacinaData);

    await this.vacinaRepository.update(id, updatedVacina);
    return updatedVacina;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.vacinaRepository.remove(id);
    return { deleted: true };
  }
}