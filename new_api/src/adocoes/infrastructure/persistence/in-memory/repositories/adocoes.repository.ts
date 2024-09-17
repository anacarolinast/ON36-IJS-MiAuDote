import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdocaoRepository } from 'src/adocoes/application/ports/adocoes.repository';
import { Adocao } from 'src/adocoes/domain/adocao';
import { AdocaoEntity } from '../entities/adocao.entity';
import { AdocaoMapper } from '../mappers/adocoes.mapper';

@Injectable()
export class InMemoryAdocaoRepository implements AdocaoRepository {
  constructor(
    @InjectRepository(AdocaoEntity)
    private readonly adocaoRepository: Repository<AdocaoEntity>,
  ) {}

  async save(adocao: Adocao): Promise<Adocao> {
    const persistenceModel = AdocaoMapper.paraPersistencia(adocao);
    const savedEntity = await this.adocaoRepository.save(persistenceModel);
    return AdocaoMapper.paraDominio(savedEntity);
  }

  async findAll(): Promise<Adocao[]> {
    const entities = await this.adocaoRepository.find();
    return entities.map((item) => AdocaoMapper.paraDominio(item));
  }

  async findById(id: number): Promise<Adocao | null> {
    const entity = await this.adocaoRepository.findOneBy({ id });
    return entity ? AdocaoMapper.paraDominio(entity) : null;
  }

  async update(id: number, adocao: Partial<Adocao>): Promise<Adocao | null> {
    const existingEntity = await this.adocaoRepository.findOneBy({ id });
    if (!existingEntity) {
      return null;
    }

    const updatedEntity: AdocaoEntity = {
      ...existingEntity,
      ...AdocaoMapper.paraPersistencia({
        ...existingEntity,
        ...adocao,
        id
      })
    };

    await this.adocaoRepository.save(updatedEntity);
    return AdocaoMapper.paraDominio(updatedEntity);
  }

  async remove(id: number): Promise<void> {
    await this.adocaoRepository.delete(id);
  }
}
