// Ajustar conforme os refactories

// import { Pessoa } from 'src/pessoa/entities/pessoa.entity';
// import { Adocao } from 'src/adocao/entities/adocao.entity';

export class Adotante {
    constructor(
      public readonly id: number,
      public readonly renda: number,
      public readonly condicao_entrevista: string,
      public readonly pessoa_id: number,

    // Ajustar conforme os refactories
    //   public readonly pessoa?: Pessoa,
    //   public readonly adocao?: Adocao[],

    ) {}
  }
  