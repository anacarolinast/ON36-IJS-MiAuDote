export class CreateDoadorCommand {
    constructor(
      public readonly tipo_doacao: string,
      public readonly descricao: string,
      public readonly pessoa_id: number
    ) {}
  }