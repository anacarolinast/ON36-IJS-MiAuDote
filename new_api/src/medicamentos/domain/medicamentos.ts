// Ajustar conforme os refactories
// import { Animal } from 'src/animais/entities/animais.entity';
// import { Veterinario } from 'src/veterinarios/entities/veterinarios.entity';
// import { Gasto } from 'src/gastos/entities/gastos.entity';

export class Medicamento {
    constructor(
      public readonly id: number,
      public readonly animal_id: number,
      public readonly data_compra: Date,
      public readonly descricao: string,
      public readonly veterinario_id: number,
      public readonly gasto_id: number,

    // Ajustar conforme os refactories
    //   public readonly animal?: animal,
    //   public readonly veterinario?: veterinario,
    //   public readonly gasto?: gasto,

    ) {}
  }
  