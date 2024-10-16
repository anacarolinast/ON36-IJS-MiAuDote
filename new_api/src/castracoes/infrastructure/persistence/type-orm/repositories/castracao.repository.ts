import { Inject, Injectable } from '@nestjs/common';
import { CastracaoRepository } from '../../../../../castracoes/application/ports/castracoes.repository';
import { Castracao } from '../../../../../castracoes/domain/castracao';
import { CastracaoEntity } from '../entities/castracao.entity';
import { CastracaoMapper } from '../mappers/castracao.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { GastoEntity } from 'src/gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmCastracaoRepository implements CastracaoRepository {
  constructor(
    private readonly castracaoMapper: CastracaoMapper,
    @Inject(GastoRepository)
    private readonly gastoRepository: GastoRepository,
    @InjectRepository(CastracaoEntity)
    private readonly castracaoRepository: Repository<CastracaoEntity>,
  ) {}

  async save(castracao: Castracao): Promise<Castracao> {
    const gastoEntity = new GastoEntity();

    gastoEntity.data_gasto = castracao.data_gasto;
    gastoEntity.tipo = castracao.tipo;
    gastoEntity.quantidade = castracao.quantidade;
    gastoEntity.valor = castracao.valor;

    const savedGasto = await this.gastoRepository.save(gastoEntity);

    const castracaoEntity =
      await this.castracaoMapper.paraPersistencia(castracao);

    castracaoEntity.gasto_id = savedGasto.id;
    castracaoEntity.gasto = savedGasto;

    const savedCastracaoEntity =
      await this.castracaoRepository.save(castracaoEntity);

    return CastracaoMapper.paraDominio(savedCastracaoEntity);
  }

  async findAll(): Promise<Castracao[]> {
    const entities = await this.castracaoRepository.find({
      relations: ['gasto'],
    });
    return entities.map(CastracaoMapper.paraDominio);
  }

  async findById(id: number): Promise<Castracao | null> {
    const entity = await this.castracaoRepository.findOne({
      where: { id },
      relations: ['gasto'],
    });
    if (!entity) return null;
    return CastracaoMapper.paraDominio(entity);
  }

  async update(
    id: number,
    castracao: Partial<Castracao>,
  ): Promise<Castracao | null> {
    const existingCastracaoEntity = await this.castracaoRepository.findOne({
      where: { id },
      relations: ['gasto'],
    });
    if (!existingCastracaoEntity) {
      console.log(`Castracao com ID ${id} não encontrado.`);
      return null;
    }

    existingCastracaoEntity.data_castracao =
      castracao.data_castracao ?? existingCastracaoEntity.data_castracao;
    existingCastracaoEntity.condicao_pos =
      castracao.condicao_pos ?? existingCastracaoEntity.condicao_pos;

    const updatedCastracaoEntity = await this.castracaoRepository.save({
      ...existingCastracaoEntity,
      ...castracao,
    });

    return CastracaoMapper.paraDominio(updatedCastracaoEntity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.castracaoRepository.delete(id);
    if (result.affected === 0) {
      console.log(`Castracao com ID ${id} não encontrado.`);
    } else {
      console.log(`Castracao com ID ${id} removido.`);
    }
  }
}
