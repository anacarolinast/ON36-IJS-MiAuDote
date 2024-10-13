import { Injectable } from '@nestjs/common';
import { Castracao } from '../../../../domain/castracao';
import { CastracaoEntity } from '../entities/castracao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GastoEntity } from '../../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { AnimalEntity } from '../../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { VeterinarioEntity } from '../../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { Repository } from 'typeorm';
import { Gasto } from '../../../../../gastos/domain/gastos';
import { Animal } from '../../../../../animais/domain/animal';
import { Veterinario } from '../../../../../veterinarios/domain/veterinarios';

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

  paraDominio(castracaoEntity: CastracaoEntity): Castracao {
    const gasto = new Gasto(
        castracaoEntity.gasto.id,
        castracaoEntity.gasto.data_gasto, 
        castracaoEntity.gasto.tipo,
        castracaoEntity.gasto.quantidade,
        castracaoEntity.gasto.valor
      );

     const animal = new Animal(
        castracaoEntity.animal.id,
        castracaoEntity.animal.nome, 
        castracaoEntity.animal.especie,
        castracaoEntity.animal.sexo,
        castracaoEntity.animal.data_nascimento,
        castracaoEntity.animal.condicao_saude,
        castracaoEntity.animal.estado_adocao
      );

    const veterinario = new Veterinario(
        castracaoEntity.veterinario.id,
        castracaoEntity.veterinario.especialidade, 
        castracaoEntity.veterinario.registro_crmv
        );

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
    entity.gasto_id = null;

    return entity;
  }
}
