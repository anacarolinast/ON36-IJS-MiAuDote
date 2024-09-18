import { VeterinarioFactory } from './../domain/factories/veterinarios-factory';
import { Injectable, NotFoundException } from '@nestjs/common';
import { VeterinarioRepository } from './ports/veterinarios.repository';
import { Veterinario } from '../domain/veterinarios';

@Injectable()
export class VeterinariosService {
  constructor(
    private readonly veterinariosRepository: VeterinarioRepository,
    private readonly veterinarioFactory: VeterinarioFactory,
  ) {}

  async findAll(): Promise<Veterinario[]> {
    return this.veterinariosRepository.findAll();
  }

  async findOne(id: number): Promise<Veterinario> {
    const veterinario = await this.veterinariosRepository.findById(id);
    if (!veterinario) {
      throw new NotFoundException(`Veterinario with ID ${id} not found`);
    }
    return veterinario;
  }

  async create(createVeterinarioDto: any): Promise<Veterinario> {
    const newVeterinario = this.veterinarioFactory.create(createVeterinarioDto);
    return this.veterinariosRepository.save(newVeterinario);
  }

  async update(id: number, updateVeterinarioDto: any): Promise<Veterinario> {
    const veterinario = await this.findOne(id);

    const updatedVeterinarioData = {
      especialidade:
        updateVeterinarioDto.especialidade ?? veterinario.especialidade,
      registro_crmv:
        updateVeterinarioDto.registro_crmv ?? veterinario.registro_crmv,
      pessoa_id: updateVeterinarioDto.pessoa_id ?? veterinario.pessoa_id,
      // pessoa: updateVeterinarioDto.pessoa ?? veterinario.pessoa,
      // vacinas: updateVeterinarioDto.vacinas ?? veterinario.vacinas,
      // medicamentos: updateVeterinarioDto.medicamentos ?? veterinario.medicamentos,
      // castracoes: updateVeterinarioDto.castracoes ?? veterinario.castracoes,
    };

    const updatedVeterinario = this.veterinarioFactory.create(
      updatedVeterinarioData,
    );

    await this.veterinariosRepository.update(id, updatedVeterinario);
    return updatedVeterinario;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.veterinariosRepository.remove(id);
    return { deleted: true };
  }
}
