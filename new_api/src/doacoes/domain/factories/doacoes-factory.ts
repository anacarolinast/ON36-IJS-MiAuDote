import { Injectable } from '@nestjs/common';
import { Doacao } from '../doacoes';
import { v4 as uuidv4 } from 'uuid';
import { CreateDoacaoDto } from 'src/doacoes/presenters/http/dto/create-doacao.dto';
import { Doador } from 'src/doadores/domain/doadores';
import { Gasto } from 'src/gastos/domain/gastos';

@Injectable()
export class DoacaoFactory {
  create(data: CreateDoacaoDto, gasto: Gasto, doador: Doador): Doacao {
    const castracaoId = uuidv4();

    return new Doacao(
      castracaoId,
      doador.id,
      data.data_doacao,
      data.tipo_doacao,
      data.valor_estimado,
      gasto.id
    );
  }
}