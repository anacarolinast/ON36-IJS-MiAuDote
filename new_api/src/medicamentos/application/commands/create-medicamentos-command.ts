export class CreateMedicamentoCommand {
    constructor(
      public readonly animal_id: number,
      public readonly data_compra: Date,
      public readonly descricao: string,
      public readonly veterinario_id: number,
      public readonly gasto_id: number,
    ) {}
  }