import { Inject, Injectable } from '@nestjs/common';
import { ConsumivelRepository } from '../../../../../consumiveis/application/ports/consumiveis.repository';
import { Consumivel } from '../../../../../consumiveis/domain/consumivel';
import { ConsumivelEntity } from '../entities/consumivel.entity';
import { ConsumivelMapper } from '../mappers/consumivel.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { GastoEntity } from 'src/gastos/infrastructure/persistence/type-orm/entities/gasto.entity';

@Injectable()
export class TypeOrmConsumivelRepository implements ConsumivelRepository {
  constructor(
    private readonly consumivelMapper: ConsumivelMapper,
    @Inject(GastoRepository)
    private readonly gastoRepository: GastoRepository,
    @InjectRepository(ConsumivelEntity)
    private readonly consumivelRepository: Repository<ConsumivelEntity>,
  ) {}

  async save(consumivel: Consumivel): Promise<Consumivel> {
    const gastoEntity = new GastoEntity();

    gastoEntity.data_gasto = consumivel.data_gasto;
    gastoEntity.tipo = consumivel.tipo;
    gastoEntity.quantidade = consumivel.quantidade;
    gastoEntity.valor = consumivel.valor;

    const savedGasto = await this.gastoRepository.save(gastoEntity);

    const consumivelEntity =
      await this.consumivelMapper.paraPersistencia(consumivel);

    consumivelEntity.gasto_id = savedGasto.id;
    consumivelEntity.gasto = savedGasto;

    const savedConsumivelEntity =
      await this.consumivelRepository.save(consumivelEntity);

    return ConsumivelMapper.paraDominio(savedConsumivelEntity);
  }

  async findAll(): Promise<Consumivel[]> {
    const entities = await this.consumivelRepository.find({
      relations: ['gasto'],
    });
    return entities.map(ConsumivelMapper.paraDominio);
  }

  async findById(id: number): Promise<Consumivel | null> {
    const entity = await this.consumivelRepository.findOne({
      where: { id },
      relations: ['gasto'],
    });
    if (!entity) return null;
    return ConsumivelMapper.paraDominio(entity);
  }

  async update(
    id: number,
    consumivel: Partial<Consumivel>,
  ): Promise<Consumivel | null> {
    const existingConsumivelEntity = await this.consumivelRepository.findOne({
      where: { id },
      relations: ['gasto'],
    });

    if (!existingConsumivelEntity) {
      console.log('Consumivel entity not found');
      return null;
    }

    existingConsumivelEntity.tipo_animal =
      consumivel.tipo_animal ?? existingConsumivelEntity.tipo_animal;
    existingConsumivelEntity.descricao =
      consumivel.descricao ?? existingConsumivelEntity.descricao;

    const updatedConsumivelEntity = await this.consumivelRepository.save({
      ...existingConsumivelEntity,
      ...consumivel,
    });

    return ConsumivelMapper.paraDominio(updatedConsumivelEntity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.consumivelRepository.delete(id);
    if (result.affected === 0) {
      console.log(`Consumivel com ID ${id} não encontrado.`);
    } else {
      console.log(`Consumivel com ID ${id} removido.`);
    }
  }
}
