import { Injectable } from '@nestjs/common';
import { Adocao } from '../../../../domain/adocao';
import { AdocaoEntity } from '../entities/adocao.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdotanteEntity } from '../../../../../adotantes/infrastructure/persistence/type-orm/entities/adotante.entity';
import { AnimalEntity } from '../../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { Repository } from 'typeorm';
import { Adotante } from '../../../../../adotantes/domain/adotante';
import { Animal } from '../../../../../animais/domain/animal';

@Injectable()
export class AdocaoMapper {
  constructor(
    @InjectRepository(AdotanteEntity)
    private readonly adotanteRepository: Repository<AdotanteEntity>,
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>
  ) {}

  paraDominio(adocaoEntity: AdocaoEntity): Adocao {
    const adotante = new Adotante(
      adocaoEntity.adotante.id,
      adocaoEntity.adotante.renda,
      adocaoEntity.adotante.condicao_entrevista,
      [],
      adocaoEntity.adotante.pessoa.id,
      adocaoEntity.adotante.pessoa.nome,
      adocaoEntity.adotante.pessoa.cep,
      adocaoEntity.adotante.pessoa.endereco,
      adocaoEntity.adotante.pessoa.telefone,
      adocaoEntity.adotante.pessoa.email,
      adocaoEntity.adotante.pessoa.cpf
    );

    const animal = new Animal(
      adocaoEntity.animal.id,
      adocaoEntity.animal.nome,
      adocaoEntity.animal.especie,
      adocaoEntity.animal.sexo,
      adocaoEntity.animal.data_nascimento,
      adocaoEntity.animal.condicao_saude,
      adocaoEntity.animal.estado_adocao
    );

    return new Adocao(
      adocaoEntity.id,
      adotante.id,
      animal.id,
      adocaoEntity.data_adocao,
      adocaoEntity.condicoes_especiais,
      adocaoEntity.status_aprovacao,
      animal,
      adotante
    );
  }

  async paraPersistencia(adocao: Adocao): Promise<AdocaoEntity> {
    const entity = new AdocaoEntity();
    entity.id = adocao.id;
    entity.data_adocao = adocao.data_adocao;
    entity.condicoes_especiais = adocao.condicoes_especiais;
    entity.status_aprovacao = adocao.status_aprovacao;

    const adotanteEntity = await this.adotanteRepository.findOne({
      where: { id: adocao.adotante.id },
    });
    if (!adotanteEntity) {
      throw new Error(`Adotante com ID ${adocao.adotante.id} não encontrado`);
    }
    entity.adotante = adotanteEntity;

    const animalEntity = await this.animalRepository.findOne({
      where: { id: adocao.animal.id },
    });
    if (!animalEntity) {
      throw new Error(`Animal com ID ${adocao.animal.id} não encontrado`);
    }
    entity.animal = animalEntity;

    return entity;
  }
}
