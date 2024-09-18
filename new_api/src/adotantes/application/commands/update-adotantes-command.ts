export class UpdateAdotanteCommand {
    constructor(
      public readonly id: number,
      public readonly renda?: number,
      public readonly condicao_entrevista?: string,
      public readonly pessoa_id?: number
    ) {}
  }