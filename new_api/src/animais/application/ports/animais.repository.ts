import { Injectable } from '@nestjs/common';
import { Animal } from 'src/animais/domain/animal';
import { Medicamento } from 'src/medicamentos/domain/medicamentos';
import { Vacina } from 'src/vacinas/domain/vacinas';

@Injectable()
export abstract class AnimalRepository {
  abstract save(animal: Animal): Promise<Animal>;
  abstract findAll(): Promise<Animal[]>;
  abstract findById(id: number): Promise<Animal | null>;
  abstract update(id: number, animal: Partial<Animal>): Promise<Animal | null>;
  abstract remove(id: number): Promise<void>;
  abstract adopt(animalId: number, adocaoData: any): Promise<void>;
  abstract vaccinate(id: number, vacina: Vacina): Promise<Animal | null>;
  abstract medicate(id: number, medicamento: Medicamento): Promise<Animal | null>;
  abstract castrate(animalId: number, castracaoData: any): Promise<void>;
}
