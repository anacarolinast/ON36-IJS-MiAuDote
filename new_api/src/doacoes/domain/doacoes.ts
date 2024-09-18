// Ajustar conforme os refactories
// import { Gasto } from 'src/gasto/entities/gasto.entity';
// import { Doador } from 'src/doador/entities/doador.entity';

export class Doacao {
    constructor(
      public readonly id: number,
      public readonly doador_id: number,
      public readonly data_doacao: Date,
      public readonly tipo_doacao: string,
      public readonly valor_estimado: number,
      public readonly gasto_id: number,

    // Ajustar conforme os refactories
    //   public readonly gasto?: gasto,
    //   public readonly doador?: doador,

    ) {}
  }
  