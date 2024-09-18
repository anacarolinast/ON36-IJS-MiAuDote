import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DoacaoRepository } from 'src/doacoes/application/ports/doacao.repository';
import { Doacao } from 'src/doacoes/domain/doacoes';
import { DoacaoEntity } from '../entities/doacao.entity';
import { DoacaoMapper } from '../mappers/doacao.mappers';

@Injectable()
export class InMemoryDoacaoRepository implements DoacaoRepository {
  constructor(
    @InjectRepository(DoacaoEntity)
    private readonly doacaoRepository: Repository<DoacaoEntity>,
  ) {}

  async save(doacao: Doacao): Promise<Doacao> {
    const persistenceModel = DoacaoMapper.paraPersistencia(doacao);
    const savedEntity = await this.doacaoRepository.save(persistenceModel);
    return DoacaoMapper.paraDominio(savedEntity);
  }

  async findAll(): Promise<Doacao[]> {
    const entities = await this.doacaoRepository.find();
    return entities.map((item) => DoacaoMapper.paraDominio(item));
  }

  async findById(id: number): Promise<Doacao | null> {
    const entity = await this.doacaoRepository.findOneBy({ id });
    return entity ? DoacaoMapper.paraDominio(entity) : null;
  }

  async update(id: number, doacao: Partial<Doacao>): Promise<Doacao | null> {
    const existingEntity = await this.doacaoRepository.findOneBy({ id });
    if (!existingEntity) {
      return null;
    }

    const updatedEntity: DoacaoEntity = {
      ...existingEntity,
      ...DoacaoMapper.paraPersistencia({
        ...existingEntity,
        ...doacao,
        id
      })
    };

    await this.doacaoRepository.save(updatedEntity);
    return DoacaoMapper.paraDominio(updatedEntity);
  }

  async remove(id: number): Promise<void> {
    await this.doacaoRepository.delete(id);
  }
}
