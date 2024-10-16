import { Injectable } from '@nestjs/common';
import { Adotante } from '../../../../domain/adotante';
import { AdotanteEntity } from '../entities/adotante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdocaoEntity } from '../../../../../adocoes/infrastructure/persistence/type-orm/entities/adocao.entity';
import { PessoaEntity } from '../../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { Repository } from 'typeorm';
import { Adocao } from '../../../../../adocoes/domain/adocao';
import { Pessoa } from '../../../../../pessoas/domain/pessoas';
import { AnimalEntity } from 'src/animais/infrastructure/persistence/type-orm/entities/animal.entity';

@Injectable()
export class AdotanteMapper {
  constructor(
    @InjectRepository(AdocaoEntity)
    private readonly adocaoRepository: Repository<AdocaoEntity>,
    @InjectRepository(PessoaEntity)
    private readonly pessoaRepository: Repository<PessoaEntity>,
  ) {}

  static paraDominio(adotanteEntity: AdotanteEntity): Adotante {
    console.log('Adotante entity:', adotanteEntity);
    
    const adocoes = adotanteEntity.adocoes?.map(adocaoEntity => {
      return new Adocao(
        adocaoEntity.id,
        adocaoEntity.adotante ? adocaoEntity.adotante.id : null, 
        adocaoEntity.animal ? adocaoEntity.animal.id : null,
        adocaoEntity.data_adocao,
        adocaoEntity.condicoes_especiais,
        adocaoEntity.status_aprovacao,
      );
    }) || []; 

    const pessoa = adotanteEntity.pessoa 
      ? new Pessoa(
          adotanteEntity.pessoa.id,
          adotanteEntity.pessoa.nome,
          adotanteEntity.pessoa.cep,
          adotanteEntity.pessoa.endereco,
          adotanteEntity.pessoa.telefone,
          adotanteEntity.pessoa.email,
          adotanteEntity.pessoa.cpf
        )
      : null;

    return new Adotante(
      adotanteEntity.id,
      adotanteEntity.renda,
      adotanteEntity.condicao_entrevista,
      adocoes,
      pessoa?.id, 
      pessoa?.nome,
      pessoa?.cep,
      pessoa?.endereco,
      pessoa?.telefone,
      pessoa?.email,
      pessoa?.cpf
    );
  }

  async paraPersistencia(adotante: Adotante): Promise<AdotanteEntity> {
    const entity = new AdotanteEntity();
    entity.renda = adotante.renda;
    entity.condicao_entrevista = adotante.condicao_entrevista;

    entity.pessoa = {
      id: adotante.id, 
      nome: adotante.nome,
      cep: adotante.cep,
      endereco: adotante.endereco,
      telefone: adotante.telefone,
      email: adotante.email,
      cpf: adotante.cpf
    } as PessoaEntity;

    if (adotante.adocao) { 
      entity.adocoes = await Promise.all(adotante.adocao.map(async (adocao) => {
        const adocaoEntity = new AdocaoEntity();
        adocaoEntity.animal = { id: adocao.animal_id } as AnimalEntity;
        adocaoEntity.data_adocao = adocao.data_adocao;
        adocaoEntity.condicoes_especiais = adocao.condicoes_especiais;
        adocaoEntity.status_aprovacao = adocao.status_aprovacao;

        return adocaoEntity;
      }));
    }

    return entity;
  }
}
