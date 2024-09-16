import { Injectable } from '@nestjs/common';
import { AnimalRepository } from 'src/animais/application/ports/animais.repository'; 
import { Animal } from '../../../../domain/animal';
import { AnimalEntity } from '../entities/animais.entity';

@Injectable()
export class InFileAnimalRepository implements AnimalRepository {

  async save(animal: Animal): Promise<Animal> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Animal[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: number): Promise<Animal | null> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, animal: Partial<Animal>): Promise<Animal | null> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private readonly animais = new Map<string, AnimalEntity>();
}