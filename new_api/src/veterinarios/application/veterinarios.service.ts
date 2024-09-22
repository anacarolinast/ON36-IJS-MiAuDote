import { VeterinarioFactory } from './../domain/factories/veterinarios-factory';
import { Injectable, NotFoundException } from '@nestjs/common';
import { VeterinarioRepository } from './ports/veterinarios.repository';
import { Veterinario } from '../domain/veterinarios';
import { PessoaRepository } from 'src/pessoas/application/ports/pessoas.repository';
import { UpdateVeterinarioDto } from '../presenters/http/dto/update-veterinario.dto';

@Injectable()
export class VeterinariosService {
  constructor(
    private readonly veterinariosRepository: VeterinarioRepository,
    private readonly veterinarioFactory: VeterinarioFactory,
    private readonly pessoaRepository: PessoaRepository,
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
    const pessoa = await this.pessoaRepository.findById(
      createVeterinarioDto.pessoa_id,
    );
    if (!pessoa) {
      throw new NotFoundException(
        `Pessoa with ID ${createVeterinarioDto.pessoa_id} not found`,
      );
    }
    const newVeterinario = this.veterinarioFactory.create(createVeterinarioDto, pessoa);
    return this.veterinariosRepository.save(newVeterinario);
  }

  async update(
    id: number, 
    updateVeterinarioDto: UpdateVeterinarioDto,
  ): Promise<Veterinario> {
    const veterinario = await this.findOne(id);
    const updatedVeterinarioData = {
      especialidade:
        updateVeterinarioDto.especialidade ?? veterinario.especialidade,
      registro_crmv:
        updateVeterinarioDto.registro_crmv ?? veterinario.registro_crmv,
      pessoa_id: updateVeterinarioDto.pessoa_id ?? veterinario.pessoa_id,
    };

    const pessoa = await this.pessoaRepository.findById(updatedVeterinarioData.pessoa_id);
    if (!pessoa) {
      throw new NotFoundException(`Pessoa with ID ${updatedVeterinarioData.pessoa_id} not found`);
    }
  
    const updatedVeterinario = this.veterinarioFactory.create(
      updatedVeterinarioData, pessoa
    );

  
    const result = await this.veterinariosRepository.update(id, updatedVeterinario);
    if (!result) {
      throw new NotFoundException(`Adotante with ID ${id} not found for update.`);
    }

    return updatedVeterinario;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.veterinariosRepository.remove(id);
    return { deleted: true };
  }
}
