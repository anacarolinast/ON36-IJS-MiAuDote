import { Injectable } from '@nestjs/common';
import { Castracao } from 'src/castracoes/domain/castracao';

@Injectable()
export abstract class CastracaoRepository {
  abstract save(castracao: Castracao): Promise<Castracao>;
  abstract findAll(): Promise<Castracao[]>;
  abstract findById(id: number): Promise<Castracao | null>;
  abstract update(id: number, castracao: Partial<Castracao>): Promise<Castracao | null>;
  abstract remove(id: number): Promise<void>;
}
