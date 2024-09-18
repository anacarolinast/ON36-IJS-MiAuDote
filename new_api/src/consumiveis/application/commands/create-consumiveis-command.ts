export class CreateConsumivelCommand {
    constructor(
      public readonly tipo_animal: string,
      public readonly descricao: string,
      public readonly gasto_id: number
    ) {}
  }