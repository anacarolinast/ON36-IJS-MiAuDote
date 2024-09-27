import { Injectable } from '@nestjs/common';
import { Castracao } from '../castracao';
import { v4 as uuidv4 } from 'uuid';
import { CreateCastracaoDto } from 'src/castracoes/presenters/http/dto/create-castracao.dto';
import { Veterinario } from 'src/veterinarios/domain/veterinarios';

@Injectable()
export class CastracaoFactory {
  create(data: CreateCastracaoDto, veterinario: Veterinario): Castracao {
    const castracaoId = uuidv4();

    return new Castracao(
      castracaoId,
      data.animal_id,
      data.data_castracao,
      data.condicao_pos,
      veterinario.id,
      data.gasto_id
    );
  }
}