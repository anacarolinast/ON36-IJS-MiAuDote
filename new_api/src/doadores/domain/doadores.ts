import { Pessoa } from 'src/pessoas/domain/pessoas';
import { Doacao } from 'src/doacoes/domain/doacoes';

export class Doador {
    constructor(
      public readonly id: number,
      public readonly tipo_doacao: string,
      public readonly descricao: string,
      public readonly pessoa_id: number,
      public readonly pessoa?: Pessoa,
      public readonly doacao?: Doacao,
    ) {}
  }
  