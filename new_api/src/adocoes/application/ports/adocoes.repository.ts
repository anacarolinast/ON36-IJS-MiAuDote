import { Injectable } from '@nestjs/common';
import { Adocao } from 'src/adocoes/domain/adocao';

@Injectable()
export abstract class AdocaoRepository {
  abstract save(adocao: Adocao): Promise<Adocao>;
  abstract findAll(): Promise<Adocao[]>;
  abstract findById(id: number): Promise<Adocao | null>;
  abstract update(id: number, adocao: Partial<Adocao>): Promise<Adocao | null>;
  abstract remove(id: number): Promise<void>;
}
