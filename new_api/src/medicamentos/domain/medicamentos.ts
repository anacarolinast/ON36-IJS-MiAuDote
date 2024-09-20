import { Animal } from 'src/animais/domain/animal';
import { Veterinario } from 'src/veterinarios/domain/veterinarios';
import { Gasto } from 'src/gastos/domain/gastos';

export class Medicamento {
    constructor(
      public readonly id: number,
      public readonly animal_id: number,
      public readonly data_compra: Date,
      public readonly descricao: string,
      public readonly veterinario_id: number,
      public readonly gasto_id: number,
      public readonly animal?: Animal,
      public readonly veterinario?: Veterinario,
      public readonly gasto?: Gasto,

    ) {}
  }
  