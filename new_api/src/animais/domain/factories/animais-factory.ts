import { Injectable } from '@nestjs/common';
import { Animal } from '../animal';
import { v4 as uuidv4 } from 'uuid';
import { CreateAnimalDto } from 'src/animais/presenters/http/dto/create-animal.dto';

@Injectable()
export class AnimalFactory {
  create(data: CreateAnimalDto): Animal {
    const animalId = uuidv4();

    return new Animal(
      animalId,
      data.nome,
      data.especie,
      data.sexo,
      data.data_nascimento,
      data.condicao_saude,
      data.estado_adocao
    );
  }
}