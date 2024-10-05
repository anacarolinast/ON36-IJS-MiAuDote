export class UpdateDoadorCommand {
    constructor(
      public readonly id: number,
      public readonly tipo_doacao?: string,
      public readonly descricao?: string,
      public readonly pessoa_id?: number
    ) {}
  }