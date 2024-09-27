import { Injectable, NotFoundException } from '@nestjs/common';
import { Medicamento } from '../domain/medicamentos';
import { CreateMedicamentoDto } from '../presenters/http/dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from '../presenters/http/dto/update-medicamento.dto';
import { MedicamentoFactory } from '../domain/factories/medicamentos-factory';
import { MedicamentoRepository } from './ports/medicamento.repository';
import { VeterinarioRepository } from 'src/veterinarios/application/ports/veterinarios.repository';

@Injectable()
export class MedicamentosService {
  constructor(
    private readonly medicamentoFactory: MedicamentoFactory,
    private readonly medicamentoRepository: MedicamentoRepository,
    private readonly veterinarioRepository: VeterinarioRepository,
  ) {}

  async findAll(): Promise<Medicamento[]> {
    return this.medicamentoRepository.findAll();
  }

  async findOne(id: number): Promise<Medicamento> {
    const medicamento = await this.medicamentoRepository.findById(id);
    if (!medicamento) {
      throw new NotFoundException(`Medicamento with ID ${id} not found`);
    }
    return medicamento;
  }

  async create(createMedicamentoDto: CreateMedicamentoDto): Promise<Medicamento> {
    const veterinario = await this.veterinarioRepository.findById(
      createMedicamentoDto.veterinario_id,
    );
    if (!veterinario) {
      throw new NotFoundException(
        `Veterinario with ID ${createMedicamentoDto.veterinario_id} not found`,
      );
    }
    const newMedicamento = this.medicamentoFactory.create(createMedicamentoDto, veterinario);
    return this.medicamentoRepository.save(newMedicamento);
  }

  async update(
    id: number, 
    updateMedicamentoDto: UpdateMedicamentoDto
  ): Promise<Medicamento> {
    const medicamento = await this.findOne(id);
    const updatedMedicamentoData = {
      animal_id: updateMedicamentoDto.animal_id ?? medicamento.animal_id,
      data_compra: updateMedicamentoDto.data_compra ?? medicamento.data_compra,
      descricao: updateMedicamentoDto.descricao ?? medicamento.descricao,
      veterinario_id: updateMedicamentoDto.veterinario_id ?? medicamento.veterinario_id,
      gasto_id: updateMedicamentoDto.gasto_id ?? medicamento.gasto_id,
    };

    const veterinario = await this.veterinarioRepository.findById(updatedMedicamentoData.veterinario_id);
    if (!veterinario){
      throw new NotFoundException(`Veterinario with ID ${updatedMedicamentoData.veterinario_id} not found`)
    }

    const updatedMedicamento = this.medicamentoFactory.create(updatedMedicamentoData, veterinario);
    const result = await this.medicamentoRepository.update(id, updatedMedicamento);
    
    if(!result){
      throw new NotFoundException(`Medicação with ID ${id} not found for update.`)
    }

    return updatedMedicamento;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.medicamentoRepository.remove(id);
    return { deleted: true };
  }
}
