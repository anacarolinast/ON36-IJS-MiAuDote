import { Injectable } from '@nestjs/common';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository'; 
import { Gasto } from '../../../../domain/gastos';
import { GastoEntity } from '../entities/gasto.entity';

@Injectable()
export class InFileGastoRepository implements GastoRepository {

  async save(gasto: Gasto): Promise<Gasto> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Gasto[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: number): Promise<Gasto | null> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, gasto: Partial<Gasto>): Promise<Gasto | null> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private readonly gastoes = new Map<string, GastoEntity>();
}