import { Gasto } from 'src/gastos/domain/gastos';
import { Doador } from 'src/doadores/domain/doadores';

export class Doacao {
    constructor(
      public readonly id: number,
      public readonly doador_id: number,
      public readonly data_doacao: Date,
      public readonly tipo_doacao: string,
      public readonly valor_estimado: number,
      public readonly gasto_id: number,
      public readonly gasto?: Gasto,
      public readonly doador?: Doador,

    ) {}
  }
  