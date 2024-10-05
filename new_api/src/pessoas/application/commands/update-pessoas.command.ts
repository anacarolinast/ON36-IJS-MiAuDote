export class UpdatePessoaCommand {
    constructor(
      public readonly id: number,
      public readonly nome: string,
      public readonly cep: string,
      public readonly endereco: string,
      public readonly telefone: string[],
      public readonly email: string,
      public readonly cpf: string,
    ) {}
  }