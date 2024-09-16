import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalRepository } from 'src/animais/application/ports/animais.repository';
import { Animal } from 'src/animais/domain/animal';
import { AnimalEntity } from '../entities/animais.entity';
import { AnimalMapper } from '../mappers/animais.mapper';

@Injectable()
export class InMemoryAnimalRepository implements AnimalRepository {
  constructor(
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>,
  ) {}

  async save(animal: Animal): Promise<Animal> {
    const persistenceModel = AnimalMapper.paraPersistencia(animal);
    const savedEntity = await this.animalRepository.save(persistenceModel);
    return AnimalMapper.paraDominio(savedEntity);
  }

  async findAll(): Promise<Animal[]> {
    const entities = await this.animalRepository.find();
    return entities.map((item) => AnimalMapper.paraDominio(item));
  }

  async findById(id: number): Promise<Animal | null> {
    const entity = await this.animalRepository.findOneBy({ id });
    return entity ? AnimalMapper.paraDominio(entity) : null;
  }

  async update(id: number, animal: Partial<Animal>): Promise<Animal | null> {
    const existingEntity = await this.animalRepository.findOneBy({ id });
    if (!existingEntity) {
      return null;
    }

    const updatedEntity: AnimalEntity = {
      ...existingEntity,
      ...AnimalMapper.paraPersistencia({
        ...existingEntity,
        ...animal,
        id
      })
    };

    await this.animalRepository.save(updatedEntity);
    return AnimalMapper.paraDominio(updatedEntity);
  }

  async remove(id: number): Promise<void> {
    await this.animalRepository.delete(id);
  }
}
