import { Injectable } from '@nestjs/common';
import { Animal } from '../../../../domain/animal';
import { AnimalEntity } from '../entities/animal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CastracaoEntity } from '../../../../../castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { VacinaEntity } from '../../../../../vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { MedicamentoEntity } from '../../../../../medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { AdocaoEntity } from '../../../../../adocoes/infrastructure/persistence/type-orm/entities/adocao.entity';
import { Repository } from 'typeorm';
import { Adocao } from '../../../../../adocoes/domain/adocao';
import { Castracao } from '../../../../../castracoes/domain/castracao';
import { Vacina } from '../../../../../vacinas/domain/vacinas';
import { Medicamento } from '../../../../../medicamentos/domain/medicamentos';

@Injectable()
export class AnimalMapper {
  constructor(
    @InjectRepository(AdocaoEntity)
    private readonly adocaoRepository: Repository<AdocaoEntity>,
    @InjectRepository(CastracaoEntity)
    private readonly castracaoRepository: Repository<CastracaoEntity>,
    @InjectRepository(VacinaEntity)
    private readonly vacinaRepository: Repository<VacinaEntity>,
    @InjectRepository(MedicamentoEntity)
    private readonly medicamentoRepository: Repository<MedicamentoEntity>,
  ) {}

  paraDominio(animalEntity: AnimalEntity): Animal {
    const adocao = animalEntity.adocao
      ? new Adocao(
          animalEntity.adocao.id,
          animalEntity.adocao.adotante_id, 
          animalEntity.adocao.animal_id,
          animalEntity.adocao.data_adocao,
          animalEntity.adocao.condicoes_especiais,
          animalEntity.adocao.status_aprovacao
        )
      : null;

    const castracoes = animalEntity.castracao
      ? new Castracao(
          animalEntity.castracao.id,
          animalEntity.castracao.animal_id, 
          animalEntity.castracao.data_castracao,
          animalEntity.castracao.condicao_pos,
          animalEntity.castracao.veterinario_id,
          animalEntity.castracao.gasto_id
        )
      : null;

    const vacinas = animalEntity.vacinas
      ? animalEntity.vacinas.map(vacinaEntity => {
          return new Vacina(
            vacinaEntity.id,
            vacinaEntity.animal_id, 
            vacinaEntity.data_vacinacao,
            vacinaEntity.tipo_vacina,
            vacinaEntity.veterinario_id,
            vacinaEntity.gasto_id
          );
        })
      : [];

    const medicamentos = animalEntity.medicamentos
      ? animalEntity.medicamentos.map(medicamentoEntity => {
          return new Medicamento(
            medicamentoEntity.id,
            medicamentoEntity.animal_id, 
            medicamentoEntity.data_compra,
            medicamentoEntity.descricao,
            medicamentoEntity.veterinario_id,
            medicamentoEntity.gasto_id
          );
        })
      : [];

    return new Animal(
      animalEntity.id,
      animalEntity.nome,
      animalEntity.especie,
      animalEntity.sexo,
      animalEntity.data_nascimento,
      animalEntity.condicao_saude,
      animalEntity.estado_adocao,
      adocao,
      medicamentos,
      vacinas,
      castracoes
    );
  }

  async paraPersistencia(animal: Animal): Promise<AnimalEntity> {
    const entity = new AnimalEntity();
    entity.nome = animal.nome;
    entity.especie = animal.especie;
    entity.sexo = animal.sexo;
    entity.data_nascimento = animal.data_nascimento;
    entity.condicao_saude = animal.condicao_saude;
    entity.estado_adocao = animal.estado_adocao;
    entity.adocao = null;
    entity.medicamentos = [];
    entity.vacinas = [];
    entity.castracao = null;

    return entity;
  }
}
