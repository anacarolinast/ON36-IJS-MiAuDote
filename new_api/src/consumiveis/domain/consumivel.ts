// Ajustar conforme os refactories
// import { Gasto } from 'src/gasto/entities/gasto.entity';

export class Consumivel {
    constructor(
      public readonly id: number,
      public readonly tipo_animal: string,
      public readonly descricao: string,
      public readonly gasto_id: number,

    // Ajustar conforme os refactories
    //   public readonly gasto?: gasto,

    ) {}
  }
  