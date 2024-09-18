import { Injectable } from '@nestjs/common';
import { Castracao } from '../castracao';
import { v4 as uuidv4 } from 'uuid';
import { CreateCastracaoDto } from 'src/castracoes/presenters/http/dto/create-castracao.dto';

@Injectable()
export class CastracaoFactory {
  create(data: CreateCastracaoDto): Castracao {
    const castracaoId = uuidv4();

    return new Castracao(
      castracaoId,
      data.animal_id,
      data.data_castracao,
      data.condicao_pos,
      data.veterinario_id,
      data.gasto_id
    );
  }
}