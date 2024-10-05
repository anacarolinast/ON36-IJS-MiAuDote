export class UpdateDoacaoCommand {
    constructor(
      public readonly id: number,
      public readonly doador_id?: number,
      public readonly data_doacao?: Date,
      public readonly tipo_doacao?: string,
      public readonly valor_estimado?: number,
      public readonly gasto_id?: number
    ) {}
  }