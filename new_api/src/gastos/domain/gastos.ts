// Ajustar conforme os refactories
// import { Castracao } from 'src/castracao/entities/castracao.entity';
// import { Doacao } from 'src/doacoes/entities/doacoes.entity';
// import { Vacina } from 'src/vacinas/entities/vacinas.entity';

export class Gasto {
    constructor(
      public readonly id: number,
      public readonly data_gasto: Date,
      public readonly tipo: string,
      public readonly quantidade: number,
      public readonly valor: number,

    // Ajustar conforme os refactories
    //   public readonly pessoa?: pessoa,
    //   public readonly doacao?: doacao,

    ) {}
  }
  