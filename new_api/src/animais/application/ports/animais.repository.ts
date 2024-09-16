import { Injectable } from '@nestjs/common';
import { Animal } from 'src/animais/domain/animal';

@Injectable()
export abstract class AnimalRepository {
  abstract save(animal: Animal): Promise<Animal>;
  abstract findAll(): Promise<Animal[]>;
  abstract findById(id: number): Promise<Animal | null>;
  abstract update(id: number, animal: Partial<Animal>): Promise<Animal | null>;
  abstract remove(id: number): Promise<void>;
}
