import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumivelRepository } from 'src/consumiveis/application/ports/consumiveis.repository';
import { Consumivel } from 'src/consumiveis/domain/consumivel';
import { ConsumivelEntity } from '../entities/consumivel.entity';
import { ConsumivelMapper } from '../mappers/consumivel.mapper';

@Injectable()
export class InMemoryConsumivelRepository implements ConsumivelRepository {
  constructor(
    @InjectRepository(ConsumivelEntity)
    private readonly consumivelRepository: Repository<ConsumivelEntity>,
  ) {}

  async save(consumivel: Consumivel): Promise<Consumivel> {
    const persistenceModel = ConsumivelMapper.paraPersistencia(consumivel);
    const savedEntity = await this.consumivelRepository.save(persistenceModel);
    return ConsumivelMapper.paraDominio(savedEntity);
  }

  async findAll(): Promise<Consumivel[]> {
    const entities = await this.consumivelRepository.find();
    return entities.map((item) => ConsumivelMapper.paraDominio(item));
  }

  async findById(id: number): Promise<Consumivel | null> {
    const entity = await this.consumivelRepository.findOneBy({ id });
    return entity ? ConsumivelMapper.paraDominio(entity) : null;
  }

  async update(id: number, consumivel: Partial<Consumivel>): Promise<Consumivel | null> {
    const existingEntity = await this.consumivelRepository.findOneBy({ id });
    if (!existingEntity) {
      return null;
    }

    const updatedEntity: ConsumivelEntity = {
      ...existingEntity,
      ...ConsumivelMapper.paraPersistencia({
        ...existingEntity,
        ...consumivel,
        id
      })
    };

    await this.consumivelRepository.save(updatedEntity);
    return ConsumivelMapper.paraDominio(updatedEntity);
  }

  async remove(id: number): Promise<void> {
    await this.consumivelRepository.delete(id);
  }
}
