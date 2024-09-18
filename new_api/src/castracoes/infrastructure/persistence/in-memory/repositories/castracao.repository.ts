import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CastracaoRepository } from 'src/castracoes/application/ports/castracoes.repository';
import { Castracao } from 'src/castracoes/domain/castracao';
import { CastracaoEntity } from '../entities/castracao.entity';
import { CastracaoMapper } from '../mappers/castracao.mappers';

@Injectable()
export class InMemoryCastracaoRepository implements CastracaoRepository {
  constructor(
    @InjectRepository(CastracaoEntity)
    private readonly castracaoRepository: Repository<CastracaoEntity>,
  ) {}

  async save(castracao: Castracao): Promise<Castracao> {
    const persistenceModel = CastracaoMapper.paraPersistencia(castracao);
    const savedEntity = await this.castracaoRepository.save(persistenceModel);
    return CastracaoMapper.paraDominio(savedEntity);
  }

  async findAll(): Promise<Castracao[]> {
    const entities = await this.castracaoRepository.find();
    return entities.map((item) => CastracaoMapper.paraDominio(item));
  }

  async findById(id: number): Promise<Castracao | null> {
    const entity = await this.castracaoRepository.findOneBy({ id });
    return entity ? CastracaoMapper.paraDominio(entity) : null;
  }

  async update(id: number, castracao: Partial<Castracao>): Promise<Castracao | null> {
    const existingEntity = await this.castracaoRepository.findOneBy({ id });
    if (!existingEntity) {
      return null;
    }

    const updatedEntity: CastracaoEntity = {
      ...existingEntity,
      ...CastracaoMapper.paraPersistencia({
        ...existingEntity,
        ...castracao,
        id
      })
    };

    await this.castracaoRepository.save(updatedEntity);
    return CastracaoMapper.paraDominio(updatedEntity);
  }

  async remove(id: number): Promise<void> {
    await this.castracaoRepository.delete(id);
  }
}
