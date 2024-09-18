import { Injectable, NotFoundException } from '@nestjs/common';
import { Medicamento } from '../domain/medicamentos';
import { CreateMedicamentoDto } from '../presenters/http/dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from '../presenters/http/dto/update-medicamento.dto';
import { MedicamentoFactory } from '../domain/factories/medicamentos-factory';
import { MedicamentoRepository } from './ports/medicamento.repository';

@Injectable()
export class MedicamentosService {
  constructor(
    private readonly medicamentoFactory: MedicamentoFactory,
    private readonly medicamentoRepository: MedicamentoRepository,
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
    const newMedicamento = this.medicamentoFactory.create(createMedicamentoDto);
    return this.medicamentoRepository.save(newMedicamento);
  }

  async update(id: number, updateMedicamentoDto: UpdateMedicamentoDto): Promise<Medicamento> {
    const medicamento = await this.findOne(id);

    const updatedMedicamentoData = {
      animal_id: updateMedicamentoDto.animal_id ?? medicamento.animal_id,
      data_compra: updateMedicamentoDto.data_compra ?? medicamento.data_compra,
      descricao: updateMedicamentoDto.descricao ?? medicamento.descricao,
      veterinario_id: updateMedicamentoDto.veterinario_id ?? medicamento.veterinario_id,
      gasto_id: updateMedicamentoDto.gasto_id ?? medicamento.gasto_id,
    };

    const updatedMedicamento = this.medicamentoFactory.create(updatedMedicamentoData);

    await this.medicamentoRepository.update(id, updatedMedicamento);
    return updatedMedicamento;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.medicamentoRepository.remove(id);
    return { deleted: true };
  }
}
