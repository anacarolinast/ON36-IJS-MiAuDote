import { Inject, Injectable } from '@nestjs/common';
import { DoacaoRepository } from '../../../../../doacoes/application/ports/doacao.repository';
import { Doacao } from '../../../../../doacoes/domain/doacoes';
import { DoacaoEntity } from '../entities/doacao.entity';
import { DoacaoMapper } from '../mappers/doacao.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { Repository } from 'typeorm';
import { GastoEntity } from 'src/gastos/infrastructure/persistence/type-orm/entities/gasto.entity';

@Injectable()
export class TypeOrmDoacaoRepository implements DoacaoRepository {
  constructor(
    private readonly doacaoMapper: DoacaoMapper,
    @Inject(GastoRepository)
    private readonly gastoRepository: GastoRepository,
    @InjectRepository(DoacaoEntity)
    private readonly doacaoRepository: Repository<DoacaoEntity>,
  ) {}

  async save(doacao: Doacao): Promise<Doacao> {
    const gastoEntity = new GastoEntity();

    gastoEntity.data_gasto = doacao.data_gasto;
    gastoEntity.tipo = doacao.tipo;
    gastoEntity.quantidade = doacao.quantidade;
    gastoEntity.valor = doacao.valor;

    const savedGasto = await this.gastoRepository.save(gastoEntity);

    const doacaoEntity = await this.doacaoMapper.paraPersistencia(doacao);

    doacaoEntity.gasto_id = savedGasto.id;
    doacaoEntity.gasto = savedGasto;

    const savedDoacaoEntity = await this.doacaoRepository.save(doacaoEntity);

    return DoacaoMapper.paraDominio(savedDoacaoEntity);
  }

  async findAll(): Promise<Doacao[]> {
    const entities = await this.doacaoRepository.find({
      relations: ['gasto'],
    });
    return entities.map(DoacaoMapper.paraDominio);
  }

  async findById(id: number): Promise<Doacao | null> {
    const entity = await this.doacaoRepository.findOne({
      where: { id },
      relations: ['gasto'],
    });
    if (!entity) return null;
    return DoacaoMapper.paraDominio(entity);
  }

  async update(id: number, doacao: Partial<Doacao>): Promise<Doacao | null> {
    const existingDoacaoEntity = await this.doacaoRepository.findOne({
      where: { id },
      relations: ['gasto'],
    });

    if (!existingDoacaoEntity) return null;

    existingDoacaoEntity.data_doacao =
      doacao.data_doacao ?? existingDoacaoEntity.data_doacao;
    existingDoacaoEntity.tipo_doacao =
      doacao.tipo_doacao ?? existingDoacaoEntity.tipo_doacao;
    existingDoacaoEntity.valor_estimado =
      doacao.valor_estimado ?? existingDoacaoEntity.valor_estimado;

    const updatedDoacaoEntity = await this.doacaoRepository.save({
      ...existingDoacaoEntity,
      ...doacao,
    });

    return DoacaoMapper.paraDominio(updatedDoacaoEntity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.doacaoRepository.delete(id);
    if (result.affected === 0) {
      console.log(`Doacao com ID ${id} não encontrado.`);
    } else {
      console.log(`Doacao com ID ${id} removido.`);
    }
  }
}
