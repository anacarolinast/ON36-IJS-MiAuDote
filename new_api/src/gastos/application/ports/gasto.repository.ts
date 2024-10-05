import { Injectable } from '@nestjs/common';
import { Gasto } from 'src/gastos/domain/gastos';

@Injectable()
export abstract class GastoRepository {
  abstract save(gasto: Gasto): Promise<Gasto>;
  abstract findAll(): Promise<Gasto[]>;
  abstract findById(id: number): Promise<Gasto | null>;
  abstract update(id: number, gasto: Partial<Gasto>): Promise<Gasto | null>;
  abstract remove(id: number): Promise<void>;
}
