import { Injectable } from '@nestjs/common';
import { Doador } from '../doadores';
import { v4 as uuidv4 } from 'uuid';
import { CreateDoadorDto } from 'src/doadores/presenters/http/dto/create-doador.dto';

@Injectable()
export class DoadorFactory {
  create(data: CreateDoadorDto): Doador {
    const castracaoId = uuidv4();

    return new Doador(
      castracaoId,
      data.tipo_doacao,
      data.descricao,
      data.pessoa_id
    );
  }
}