import { Gasto } from 'src/gastos/domain/gastos';

export class Consumivel {
    constructor(
      public readonly id: number,
      public readonly tipo_animal: string,
      public readonly descricao: string,
      public readonly gasto_id: number,
      public readonly gasto?: Gasto,

    ) {}
  }
  