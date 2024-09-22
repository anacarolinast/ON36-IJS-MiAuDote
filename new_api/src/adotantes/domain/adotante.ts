import { Pessoa } from 'src/pessoas/domain/pessoas';
import { Adocao } from 'src/adocoes/domain/adocao';

export class Adotante {
    constructor(
      public readonly id: number,
      public readonly renda: number,
      public readonly condicao_entrevista: string,
      public readonly pessoa_id: number,
      public readonly pessoa: Pessoa,
      public readonly adocao?: Adocao[],
    ) {}
  }
  