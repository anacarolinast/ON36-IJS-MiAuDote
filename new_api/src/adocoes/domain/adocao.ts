// Ajustar conforme os refactories

// import { Animal } from 'src/animal/entities/adocao.entity';
// import { Adotante } from 'src/adotante/entities/adotante.entity';

export class Adocao {
    constructor(
      public readonly id: number,
      public readonly adotante_id: number,
      public readonly animal_id: number,
      public readonly data_adocao: Date,
      public readonly condicoes_especiais: string,
      public readonly status_aprovacao: string,

    // Ajustar conforme os refactories
    //   public readonly animal?: Animal[],
    //   public readonly adotante?: Adotante,

    ) {}
  }
  