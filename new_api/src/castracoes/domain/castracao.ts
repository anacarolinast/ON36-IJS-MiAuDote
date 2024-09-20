import { Veterinario } from 'src/veterinarios/domain/veterinarios';
import { Animal } from 'src/animais/domain/animal';
import { Gasto } from 'src/gastos/domain/gastos';

export class Castracao {
    constructor(
      public readonly id: number,
      public readonly animal_id: number,
      public readonly data_castracao: Date,
      public readonly condicao_pos: string,
      public readonly veterinario_id: number,
      public readonly gasto_id: number,
      public readonly veterinario?: Veterinario,
      public readonly animal?: Animal,
      public readonly gasto?: Gasto,

    ) {}
  }
  