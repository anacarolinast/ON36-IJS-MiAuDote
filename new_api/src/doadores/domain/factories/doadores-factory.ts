import { Injectable } from '@nestjs/common';
import { Doador } from '../doadores';
import { v4 as uuidv4 } from 'uuid';
import { CreateDoadorDto } from 'src/doadores/presenters/http/dto/create-doador.dto';
import { Pessoa } from 'src/pessoas/domain/pessoas';
import { Doacao } from 'src/doacoes/domain/doacoes';

@Injectable()
export class DoadorFactory {
  create(data: CreateDoadorDto, pessoa: Pessoa, doador: Doacao[]): Doador {
    const castracaoId = uuidv4();

    return new Doador(
      castracaoId,
      data.tipo_doacao,
      data.descricao,
      pessoa.id,
      pessoa,
      doador
    );
  }
}