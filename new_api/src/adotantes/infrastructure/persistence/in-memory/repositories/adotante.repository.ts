import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdotanteRepository } from 'src/adotantes/application/ports/adotantes.repository';
import { Adotante } from 'src/adotantes/domain/adotante';
import { AdotanteEntity } from '../entities/adotante.entity';
import { AdotanteMapper } from '../mappers/adotante.mappers';

@Injectable()
export class InMemoryAdotanteRepository implements AdotanteRepository {
  constructor(
    @InjectRepository(AdotanteEntity)
    private readonly adotanteRepository: Repository<AdotanteEntity>,
  ) {}

  async save(adotante: Adotante): Promise<Adotante> {
    const persistenceModel = AdotanteMapper.paraPersistencia(adotante);
    const savedEntity = await this.adotanteRepository.save(persistenceModel);
    return AdotanteMapper.paraDominio(savedEntity);
  }

  async findAll(): Promise<Adotante[]> {
    const entities = await this.adotanteRepository.find();
    return entities.map((item) => AdotanteMapper.paraDominio(item));
  }

  async findById(id: number): Promise<Adotante | null> {
    const entity = await this.adotanteRepository.findOneBy({ id });
    return entity ? AdotanteMapper.paraDominio(entity) : null;
  }

  async update(id: number, adotante: Partial<Adotante>): Promise<Adotante | null> {
    const existingEntity = await this.adotanteRepository.findOneBy({ id });
    if (!existingEntity) {
      return null;
    }

    const updatedEntity: AdotanteEntity = {
      ...existingEntity,
      ...AdotanteMapper.paraPersistencia({
        ...existingEntity,
        ...adotante,
        id
      })
    };

    await this.adotanteRepository.save(updatedEntity);
    return AdotanteMapper.paraDominio(updatedEntity);
  }

  async remove(id: number): Promise<void> {
    await this.adotanteRepository.delete(id);
  }
}
