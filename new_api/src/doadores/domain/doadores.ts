// Ajustar conforme os refactories
// import { Pessoa } from 'src/pessoas/entities/pessoas.entity';
// import { Doacao } from 'src/doacoes/entities/doacoes.entity';

export class Doador {
    constructor(
      public readonly id: number,
      public readonly tipo_doacao: string,
      public readonly descricao: string,
      public readonly pessoa_id: number,

    // Ajustar conforme os refactories
    //   public readonly pessoa?: pessoa,
    //   public readonly doacao?: doacao,

    ) {}
  }
  