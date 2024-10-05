export class UpdateAnimalCommand {
    constructor(
      public readonly id: number,
      public readonly nome?: string,
      public readonly especie?: string,
      public readonly sexo?: string,
      public readonly data_nascimento?: Date,
      public readonly condicao_saude?: string,
      public readonly estado_adocao?: string,
    ) {}
  }