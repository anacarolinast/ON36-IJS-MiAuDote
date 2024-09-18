import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { Gasto } from 'src/gastos/domain/gastos';
import { GastoEntity } from '../entities/gasto.entity';
import { GastoMapper } from '../mappers/gasto.mapper';

@Injectable()
export class InMemoryGastoRepository implements GastoRepository {
  constructor(
    @InjectRepository(GastoEntity)
    private readonly gastoRepository: Repository<GastoEntity>,
  ) {}

  async save(gasto: Gasto): Promise<Gasto> {
    const persistenceModel = GastoMapper.paraPersistencia(gasto);
    const savedEntity = await this.gastoRepository.save(persistenceModel);
    return GastoMapper.paraDominio(savedEntity);
  }

  async findAll(): Promise<Gasto[]> {
    const entities = await this.gastoRepository.find();
    return entities.map((item) => GastoMapper.paraDominio(item));
  }

  async findById(id: number): Promise<Gasto | null> {
    const entity = await this.gastoRepository.findOneBy({ id });
    return entity ? GastoMapper.paraDominio(entity) : null;
  }

  async update(id: number, gasto: Partial<Gasto>): Promise<Gasto | null> {
    const existingEntity = await this.gastoRepository.findOneBy({ id });
    if (!existingEntity) {
      return null;
    }

    const updatedEntity: GastoEntity = {
      ...existingEntity,
      ...GastoMapper.paraPersistencia({
        ...existingEntity,
        ...gasto,
        id
      })
    };

    await this.gastoRepository.save(updatedEntity);
    return GastoMapper.paraDominio(updatedEntity);
  }

  async remove(id: number): Promise<void> {
    await this.gastoRepository.delete(id);
  }
}
