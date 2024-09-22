import { Adotante } from 'src/adotantes/domain/adotante';
import { Animal } from 'src/animais/domain/animal';

export class Adocao {
    constructor(
      public readonly id: number,
      public readonly adotante_id: number,
      public readonly animal_id: number,
      public readonly data_adocao: Date,
      public readonly condicoes_especiais: string,
      public readonly status_aprovacao: string,
      public readonly animal: Animal,
      public readonly adotante: Adotante,
    ) {}
  }
  