import { Injectable } from '@nestjs/common';
import { Adocao } from '../adocao';
import { v4 as uuidv4 } from 'uuid';
import { CreateAdocaoDto } from '../../presenters/http/dto/create-adocao.dto';
import { Animal } from '../../../animais/domain/animal';
import { Adotante } from '../../../adotantes/domain/adotante';

@Injectable()
export class AdocaoFactory {
  create(data: CreateAdocaoDto, animal: Animal, adotante: Adotante): Adocao {
    const adocaoId = uuidv4();
    return new Adocao(
      adocaoId,
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
