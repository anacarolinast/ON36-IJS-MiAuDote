import { Injectable } from '@nestjs/common';
import { Medicamento } from 'src/medicamentos/domain/medicamentos';

@Injectable()
export abstract class MedicamentoRepository {
  abstract save(medicamento: Medicamento): Promise<Medicamento>;
  abstract findAll(): Promise<Medicamento[]>;
  abstract findById(id: number): Promise<Medicamento | null>;
  abstract update(id: number, medicamento: Partial<Medicamento>): Promise<Medicamento | null>;
  abstract remove(id: number): Promise<void>;
}
