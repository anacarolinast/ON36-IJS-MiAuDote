import { Injectable } from '@nestjs/common';
import { Adocao } from '../adocao';
import { v4 as uuidv4 } from 'uuid';
import { CreateAdocaoDto } from 'src/adocoes/presenters/http/dto/create-adocao.dto';

@Injectable()
export class AdocaoFactory {
  create(data: CreateAdocaoDto): Adocao {
    const adocaoId = uuidv4();

    return new Adocao(
      adocaoId,
      data.adotante_id,
      data.animal_id,
      data.data_adocao,
      data.condicoes_especiais,
      data.status_aprovacao
    );
  }
}