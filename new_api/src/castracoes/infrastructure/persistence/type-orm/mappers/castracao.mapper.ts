import { Injectable } from '@nestjs/common';
import { Castracao } from '../../../../domain/castracao';
import { CastracaoEntity } from '../entities/castracao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GastoEntity } from '../../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { AnimalEntity } from '../../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { VeterinarioEntity } from '../../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CastracaoMapper {
  constructor(
    @InjectRepository(GastoEntity)
    private readonly gastoRepository: Repository<GastoEntity>,
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>,
    @InjectRepository(VeterinarioEntity)
    private readonly veterinarioRepository: Repository<VeterinarioEntity>,
  ) {}

  static paraDominio(castracaoEntity: CastracaoEntity): Castracao {
    return new Castracao(
      castracaoEntity.id,
      castracaoEntity.animal_id,
      castracaoEntity.data_castracao,
      castracaoEntity.condicao_pos,
      castracaoEntity.veterinario_id,
      castracaoEntity.gasto_id
    );
  }

  async paraPersistencia(castracao: Castracao): Promise<CastracaoEntity> {
    const entity = new CastracaoEntity();
    entity.animal_id = castracao.animal_id;
    entity.data_castracao = castracao.data_castracao;
    entity.condicao_pos = castracao.condicao_pos;
    entity.veterinario_id = castracao.veterinario_id;

    return entity;
  }
}
