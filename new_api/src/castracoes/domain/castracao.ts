// Ajustar conforme os refactories

// import { Veterinario } from 'src/veterinarios/entities/veterinario.entity';
// import { Animal } from 'src/animais/entities/animal.entity';
// import { Gasto } from 'src/gasto/entities/gasto.entity';

export class Castracao {
    constructor(
      public readonly id: number,
      public readonly animal_id: number,
      public readonly data_castracao: Date,
      public readonly condicao_pos: string,
      public readonly veterinario_id: number,
      public readonly gasto_id: number,

    // Ajustar conforme os refactories
    //   public readonly veterinario?: veterinario,
    //   public readonly animal?: animal,
    //   public readonly gasto?: gasto,

    ) {}
  }
  