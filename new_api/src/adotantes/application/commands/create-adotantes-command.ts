export class CreateAdotanteCommand {
    constructor(
      public readonly renda: number,
      public readonly condicao_entrevista: string,
      public readonly pessoa_id: number
    ) {}
  }