import { Injectable } from '@nestjs/common';
import { Doacao } from '../doacoes';
import { v4 as uuidv4 } from 'uuid';
import { CreateDoacaoDto } from 'src/doacoes/presenters/http/dto/create-doacao.dto';

@Injectable()
export class DoacaoFactory {
  create(data: CreateDoacaoDto): Doacao {
    const castracaoId = uuidv4();

    return new Doacao(
      castracaoId,
      data.doador_id,
      data.data_doacao,
      data.tipo_doacao,
      data.valor_estimado,
      data.gasto_id
    );
  }
}