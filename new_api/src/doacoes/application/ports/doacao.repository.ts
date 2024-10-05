import { Injectable } from '@nestjs/common';
import { Doacao } from 'src/doacoes/domain/doacoes';

@Injectable()
export abstract class DoacaoRepository {
  abstract save(doacao: Doacao): Promise<Doacao>;
  abstract findAll(): Promise<Doacao[]>;
  abstract findById(id: number): Promise<Doacao | null>;
  abstract update(id: number, doacao: Partial<Doacao>): Promise<Doacao | null>;
  abstract remove(id: number): Promise<void>;
}
