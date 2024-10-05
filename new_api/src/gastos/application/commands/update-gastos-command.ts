export class UpdateGastoCommand {
    constructor(
        public readonly id: number,
        public readonly data_gasto: Date,
        public readonly tipo: string,
        public readonly quantidade: number,
        public readonly valor: number,
    ) {}
  }