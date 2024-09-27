import { Injectable, NotFoundException } from '@nestjs/common';
import { Vacina } from '../domain/vacinas';
import { CreateVacinaDto } from '../presenters/http/dto/create-vacina.dto';
import { UpdateVacinaDto } from '../presenters/http/dto/update-vacina.dto';
import { VacinaFactory } from '../domain/factories/vacinas-factory';
import { VacinaRepository } from './ports/vacinas.repository';
import { VeterinarioRepository } from 'src/veterinarios/application/ports/veterinarios.repository';
import { AnimalRepository } from 'src/animais/application/ports/animais.repository';

@Injectable()
export class VacinasService {
  constructor (
    private readonly vacinaRepository: VacinaRepository,
    private readonly vacinaFactory: VacinaFactory,
    private readonly veterinarioRepository: VeterinarioRepository,
    private readonly animalRepository: AnimalRepository,
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
    const veterinario = await this.veterinarioRepository.findById(
      createVacinaDto.veterinario_id,
    );

    const animal = await this.animalRepository.findById(
      createVacinaDto.animal_id,
    );

    if (!veterinario) {
      throw new NotFoundException(
        `Veterinario with ID ${createVacinaDto.veterinario_id} not found`,
      );
    }

    if (!animal) {
      throw new NotFoundException(
        `Animal with ID ${createVacinaDto.animal_id} not found`,
      );
    }
    const newVacina = this.vacinaFactory.create(createVacinaDto, veterinario, animal);
    return this.vacinaRepository.save(newVacina);
  }

  async update(
    id: number, 
    updateVacinaDto: UpdateVacinaDto
  ): Promise<Vacina> {
    const vacina = await this.findOne(id);
    const updatedVacinaData = {
      animal_id: updateVacinaDto.animal_id ?? vacina.animal_id,
      data_vacinacao: updateVacinaDto.data_vacinacao ?? vacina.data_vacinacao,
      tipo_vacina: updateVacinaDto.tipo_vacina ?? vacina.tipo_vacina,
      veterinario_id: updateVacinaDto.veterinario_id ?? vacina.veterinario_id,
      gasto_id: updateVacinaDto.gasto_id ?? vacina.gasto_id,
    };

    const veterinario = await this.veterinarioRepository.findById(updatedVacinaData.veterinario_id);
    if (!veterinario){
      throw new NotFoundException(`Veterinario with ID ${updatedVacinaData.veterinario_id} not found`)
    }

    const animal = await this.animalRepository.findById(updatedVacinaData.animal_id);
    if (!animal){
      throw new NotFoundException(`Animal with ID ${updatedVacinaData.animal_id} not found`)
    }

    const updatedVacina = this.vacinaFactory.create(updatedVacinaData, veterinario, animal);

    const result = await this.vacinaRepository.update(id, updatedVacina);
    
    if(!result){
      throw new NotFoundException(`Castração with ID ${id} not found for update.`)
    }
    return updatedVacina;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.vacinaRepository.remove(id);
    return { deleted: true };
  }
}