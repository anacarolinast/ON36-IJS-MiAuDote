export class CreateCastracaoCommand {
    constructor(
      public readonly animal_id: number,
      public readonly data_castracao: Date,
      public readonly condicao_pos: string,
      public readonly veterinario_id: number,
      public readonly gasto_id: number
    ) {}
  }