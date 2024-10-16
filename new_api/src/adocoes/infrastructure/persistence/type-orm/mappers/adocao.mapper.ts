import { Injectable } from '@nestjs/common';
import { Adocao } from '../../../../domain/adocao';
import { AdocaoEntity } from '../entities/adocao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdotanteEntity } from '../../../../../adotantes/infrastructure/persistence/type-orm/entities/adotante.entity';
import { AnimalEntity } from '../../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdocaoMapper {
  constructor(
    @InjectRepository(AdotanteEntity)
    private readonly adotanteRepository: Repository<AdotanteEntity>,
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>
  ) {}

  paraDominio(adocaoEntity: AdocaoEntity): Adocao {
    return new Adocao(
      adocaoEntity.id,
      adocaoEntity.adotante_id,
      adocaoEntity.animal_id,
      adocaoEntity.data_adocao,
      adocaoEntity.condicoes_especiais,
      adocaoEntity.status_aprovacao
    );
  }

  async paraPersistencia(adocao: Adocao): Promise<AdocaoEntity> {
    const entity = new AdocaoEntity();
    entity.id = adocao.id;
    entity.data_adocao = adocao.data_adocao;
    entity.condicoes_especiais = adocao.condicoes_especiais;
    entity.status_aprovacao = adocao.status_aprovacao;

    entity.adotante = { id: adocao.adotante_id } as AdotanteEntity;
    entity.animal = { id: adocao.animal_id } as AnimalEntity;

    return entity;
  }
}
