import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicamentoRepository } from 'src/medicamentos/application/ports/medicamento.repository';
import { Medicamento } from 'src/medicamentos/domain/medicamentos';
import { MedicamentoEntity } from '../entities/medicamento.entity';
import { MedicamentoMapper } from '../mappers/medicamento.mapper';

@Injectable()
export class InMemoryMedicamentoRepository implements MedicamentoRepository {
  private readonly medicamento = new Map<number, MedicamentoEntity>();
  private idCounter = 1;

  async save(medicamento: Medicamento): Promise<Medicamento> {
    const medicamentoEntity = MedicamentoMapper.paraPersistencia(medicamento);
    medicamentoEntity.id = this.idCounter++;
    this.medicamento.set(medicamentoEntity.id, medicamentoEntity);
    console.log(`Medicamento ${medicamentoEntity.id} criado com sucesso!`);
    return MedicamentoMapper.paraDominio(medicamentoEntity);
  }

  async findAll(): Promise<Medicamento[]> {
    console.log("Listando todos os medicamentos...");
    return Array.from(this.medicamento.values()).map(medicamentoEntity =>
        MedicamentoMapper.paraDominio(medicamentoEntity)
    );
  }

  async findById(id: number): Promise<Medicamento | null> {
    const medicamentoEntity = this.medicamento.get(id);
    if (medicamentoEntity) {
        console.log(`Medicamento encontrado: ${medicamentoEntity.id}`);
        return MedicamentoMapper.paraDominio(medicamentoEntity);
    } else {
        console.log(`Medicamento com ID ${id} não encontrado.`);
        return null;
    }
  }

  async update(id: number, dadosAtualizados: Partial<Medicamento>): Promise<Medicamento | null> {
    const medicamentoEntity = this.medicamento.get(id);
        
    if (medicamentoEntity) {
        Object.assign(medicamentoEntity, dadosAtualizados);

        this.medicamento.set(id, medicamentoEntity);
        console.log(`Medicamento com ID ${id} atualizada com sucesso!`);
        
        return MedicamentoMapper.paraDominio(medicamentoEntity);
    } else {
        console.log(`Medicamento com ID ${id} não encontrado.`);
        return null;
    }
  }

  async remove(id: number): Promise<void> {
    if (this.medicamento.has(id)) {
      this.medicamento.delete(id);
      console.log(`Medicamento com ID ${id} removida com sucesso!`);
  } else {
      console.log(`Medicamento com ID ${id} não encontrada para remoção.`);
  }
  }
}
