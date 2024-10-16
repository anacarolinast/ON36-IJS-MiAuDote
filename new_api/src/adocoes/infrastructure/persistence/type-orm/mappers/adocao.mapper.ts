import { Injectable } from '@nestjs/common';
import { Adocao } from '../../../../domain/adocao';
import { AdocaoEntity } from '../entities/adocao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdotanteEntity } from '../../../../../adotantes/infrastructure/persistence/type-orm/entities/adotante.entity';
import { AnimalEntity } from '../../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { Repository } from 'typeorm';
import { AnimalMapper } from 'src/animais/infrastructure/persistence/type-orm/mappers/animal.mapper';
import { AdotanteMapper } from 'src/adotantes/infrastructure/persistence/type-orm/mappers/adotante.mapper';

@Injectable()
export class AdocaoMapper {
  constructor(
    @InjectRepository(AdotanteEntity)
    private readonly adotanteRepository: Repository<AdotanteEntity>,
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>
  ) {}

  static paraDominio(adocaoEntity: AdocaoEntity): Adocao {
    console.log('Adocao entity:', adocaoEntity);

    return new Adocao(
      adocaoEntity.id,
      adocaoEntity.adotante ? adocaoEntity.adotante.id : undefined, 
      adocaoEntity.animal ? adocaoEntity.animal.id : undefined,   
      adocaoEntity.data_adocao,
      adocaoEntity.condicoes_especiais,
      adocaoEntity.status_aprovacao,
      adocaoEntity.animal ? AnimalMapper.paraDominio(adocaoEntity.animal) : undefined,
      adocaoEntity.adotante ? AdotanteMapper.paraDominio(adocaoEntity.adotante) : undefined
    );
  }

  static async paraPersistencia(adocao: Adocao): Promise<AdocaoEntity> {
    const entity = new AdocaoEntity();
    entity.id = adocao.id;
    entity.data_adocao = adocao.data_adocao;
    entity.condicoes_especiais = adocao.condicoes_especiais;
    entity.status_aprovacao = adocao.status_aprovacao;

    if (adocao.adotante_id) {
      entity.adotante = { id: adocao.adotante_id } as AdotanteEntity;
    } else {
      console.warn('Adotante ID não está definido.');
    }

    if (adocao.animal_id) {
      entity.animal = { id: adocao.animal_id } as AnimalEntity;
    } else {
      console.warn('Animal ID não está definido.');
    }

    return entity;
  }
}
