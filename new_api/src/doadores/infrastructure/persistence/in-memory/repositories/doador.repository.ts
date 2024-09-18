import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DoadorRepository } from 'src/doadores/application/ports/doador.repository';
import { Doador } from 'src/doadores/domain/doadores';
import { DoadorEntity } from '../entities/doador.entity';
import { DoadorMapper } from '../mappers/doador.mappers';

@Injectable()
export class InMemoryDoadorRepository implements DoadorRepository {
  constructor(
    @InjectRepository(DoadorEntity)
    private readonly doadorRepository: Repository<DoadorEntity>,
  ) {}

  async save(doador: Doador): Promise<Doador> {
    const persistenceModel = DoadorMapper.paraPersistencia(doador);
    const savedEntity = await this.doadorRepository.save(persistenceModel);
    return DoadorMapper.paraDominio(savedEntity);
  }

  async findAll(): Promise<Doador[]> {
    const entities = await this.doadorRepository.find();
    return entities.map((item) => DoadorMapper.paraDominio(item));
  }

  async findById(id: number): Promise<Doador | null> {
    const entity = await this.doadorRepository.findOneBy({ id });
    return entity ? DoadorMapper.paraDominio(entity) : null;
  }

  async update(id: number, doador: Partial<Doador>): Promise<Doador | null> {
    const existingEntity = await this.doadorRepository.findOneBy({ id });
    if (!existingEntity) {
      return null;
    }

    const updatedEntity: DoadorEntity = {
      ...existingEntity,
      ...DoadorMapper.paraPersistencia({
        ...existingEntity,
        ...doador,
        id
      })
    };

    await this.doadorRepository.save(updatedEntity);
    return DoadorMapper.paraDominio(updatedEntity);
  }

  async remove(id: number): Promise<void> {
    await this.doadorRepository.delete(id);
  }
}
