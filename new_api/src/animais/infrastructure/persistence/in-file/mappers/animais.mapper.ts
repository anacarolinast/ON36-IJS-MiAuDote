import { Animal } from "src/animais/domain/animal";
import { AnimalEntity } from "../entities/animais.entity";


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
      animalEntity.adocao,
      animalEntity.medicamentos,
      animalEntity.vacinas,
      animalEntity.castracao,
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
    entity.adocao = animal.adocao;
    entity.medicamentos = animal.medicamentos;
    entity.vacinas = animal.vacinas;
    entity.castracao = animal.castracao;
    return entity;
  }
}
