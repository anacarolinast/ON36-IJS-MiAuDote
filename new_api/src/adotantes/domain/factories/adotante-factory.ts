import { Injectable } from '@nestjs/common';
import { Adotante } from '../adotante';
import { v4 as uuidv4 } from 'uuid';
import { CreateAdotanteDto } from 'src/adotantes/presenters/http/dto/create-adotante.dto';

@Injectable()
export class AdotanteFactory {
  create(data: CreateAdotanteDto): Adotante {
    const adotanteId = uuidv4();

    return new Adotante(
      adotanteId,
      data.renda,
      data.condicao_entrevista,
      data.pessoa_id,
    );
  }
}