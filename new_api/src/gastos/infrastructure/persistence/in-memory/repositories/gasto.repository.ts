import { Injectable } from '@nestjs/common';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { Gasto } from 'src/gastos/domain/gastos';
import { GastoEntity } from '../entities/gasto.entity';
import { GastoMapper } from '../mappers/gasto.mapper';

@Injectable()
export class InMemoryGastoRepository implements GastoRepository {
  private readonly gastos = new Map<number, GastoEntity>();
  private idCounter = 1;

  async save(gasto: Gasto): Promise<Gasto> {
    const gastoEntity = GastoMapper.paraPersistencia(gasto);
    gastoEntity.id = this.idCounter++;
    this.gastos.set(gastoEntity.id, gastoEntity);
    console.log(`Gasto ${gastoEntity.id} criada com sucesso!`);
    return GastoMapper.paraDominio(gastoEntity);
  }

  async findAll(): Promise<Gasto[]> {
    console.log("Listando todas as gastos...");
    return Array.from(this.gastos.values());
  }

  async findById(id: number): Promise<Gasto | null> {
    const gasto = this.gastos.get(id);
    if (gasto) {
        console.log(`Gasto encontrado: ${gasto.id}`);
        return gasto;
    } else {
        console.log(`Gasto com ID ${id} não encontrado.`);
        return null;
    }
  }

  async update(id: number, gasto: Partial<Gasto>): Promise<Gasto | null> {
    const existingGasto = this.gastos.get(id);
    if (existingGasto) {
        const updatedAdotante = { ...existingGasto, ...gasto } as GastoEntity;
        this.gastos.set(id, updatedAdotante);
        console.log(`Gasto com ID ${id} atualizado com sucesso!`);
        return updatedAdotante;
    } else {
        console.log(`Gasto com ID ${id} não encontrado para atualização.`);
        return null;
    }
  }

  async remove(id: number): Promise<void> {
    if (this.gastos.has(id)) {
      this.gastos.delete(id);
      console.log(`Gasto com ID ${id} removido com sucesso!`);
  } else {
      console.log(`Gasto com ID ${id} não encontrado para remoção.`);
  }
  }
}
