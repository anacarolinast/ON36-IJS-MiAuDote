import { Animal } from "src/animais/domain/animal";
import { AnimalEntity } from "../entities/animais.entity";
import { AdocaoMapper } from "src/adocoes/infrastructure/persistence/in-memory/mappers/adocoes.mapper";
import { MedicamentoMapper } from "src/medicamentos/infrastructure/persistence/in-memory/mappers/medicamento.mapper";
import { VacinaMapper } from "src/vacinas/infrastructure/persistence/in-memory/mappers/vacina.mapper";
import { CastracaoMapper } from "src/castracoes/infrastructure/persistence/in-memory/mappers/castracao.mappers";

export class AnimalMapper {
  static paraDominio(animalEntity: AnimalEntity): Animal {
    const model = new Animal(
      animalEntity.id,
      animalEntity.nome,
      animalEntity.especie,
      animalEntity.sexo,
      animalEntity.data_nascimento,
      animalEntity.condicao_saude,
      animalEntity.estado_adocao,
      animalEntity.adocao ? AdocaoMapper.paraDominio(animalEntity.adocao) : null,
      animalEntity.medicamentos?.map(MedicamentoMapper.paraDominio) || [],
      animalEntity.vacinas?.map(VacinaMapper.paraDominio) || [],
      animalEntity.castracao ? CastracaoMapper.paraDominio(animalEntity.castracao) : null
    );
    return model;
  }

  static paraPersistencia(animal: Animal): AnimalEntity {
    const entity = new AnimalEntity();
    entity.id = animal.id;
    entity.nome = animal.nome;
    entity.especie = animal.especie;
    entity.sexo = animal.sexo;
    entity.data_nascimento = animal.data_nascimento;
    entity.condicao_saude = animal.condicao_saude;
    entity.estado_adocao = animal.estado_adocao;
    entity.adocao = animal.adocao ? AdocaoMapper.paraPersistencia(animal.adocao) : null;
    entity.medicamentos = animal.medicamentos?.map(MedicamentoMapper.paraPersistencia) || [];
    entity.vacinas = animal.vacinas?.map(VacinaMapper.paraPersistencia) || [];
    entity.castracao = animal.castracao ? CastracaoMapper.paraPersistencia(animal.castracao) : null;
    return entity;
  }
}
