export class UpdateConsumivelCommand {
    constructor(
      public readonly id: number,
      public readonly tipo_animal: string,
      public readonly descricao: string,
      public readonly gasto_id?: number
    ) {}
  }