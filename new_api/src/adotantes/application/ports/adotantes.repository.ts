import { Injectable } from '@nestjs/common';
import { Adotante } from 'src/adotantes/domain/adotante';

@Injectable()
export abstract class AdotanteRepository {
  abstract save(adotante: Adotante): Promise<Adotante>;
  abstract findAll(): Promise<Adotante[]>;
  abstract findById(id: number): Promise<Adotante | null>;
  abstract update(id: number, adotante: Partial<Adotante>): Promise<Adotante | null>;
  abstract remove(id: number): Promise<void>;
}
