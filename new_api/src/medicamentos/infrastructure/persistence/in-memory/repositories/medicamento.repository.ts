import { Injectable } from '@nestjs/common';
import { MedicamentoRepository } from 'src/medicamentos/application/ports/medicamento.repository'; 
import { Medicamento } from '../../../../domain/medicamentos';
import { MedicamentoEntity } from '../entities/medicamento.entity';

@Injectable()
export class InMemoryMedicamentoRepository implements MedicamentoRepository {

  async save(medicamento: Medicamento): Promise<Medicamento> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Medicamento[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: number): Promise<Medicamento | null> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, medicamento: Partial<Medicamento>): Promise<Medicamento | null> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private readonly medicamentoes = new Map<string, MedicamentoEntity>();
}