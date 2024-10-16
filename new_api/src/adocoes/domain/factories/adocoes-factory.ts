import { Injectable } from '@nestjs/common';
import { Adocao } from '../adocao';
import { v4 as uuidv4 } from 'uuid';
import { CreateAdocaoDto } from '../../presenters/http/dto/create-adocao.dto';
import { Animal } from '../../../animais/domain/animal';
import { Adotante } from '../../../adotantes/domain/adotante';

@Injectable()
export class AdocaoFactory {
  private static currentId: number = 0; 

  create(data: CreateAdocaoDto, animal: Animal, adotante: Adotante): Adocao {
    AdocaoFactory.currentId++; 
    return new Adocao(
      AdocaoFactory.currentId,
      adotante.id,
      animal.id,
      data.data_adocao,
      data.condicoes_especiais,
      data.status_aprovacao,
      animal,
      adotante
    );
  }
}

