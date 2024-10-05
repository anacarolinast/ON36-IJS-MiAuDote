export class CreateVeterinarioCommand {
    constructor(
      public readonly especialidade: string,
      public readonly registro_crmv: string,
      public readonly pessoa_id: number,
      public readonly pessoa: string,
      public readonly vacinas: any[],
      public readonly medicamentos: any[],
      public readonly castracoes: any[],
    ) {}
  }