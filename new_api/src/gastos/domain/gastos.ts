export class Gasto {
  constructor(
    public readonly id: number,
    public readonly data_gasto: Date,
    public readonly tipo: string,
    public readonly quantidade: number,
    public readonly valor: number,
    public readonly doacaoId?: number,
    public readonly consumivelId?: number,
    public readonly castracaoId?: number,
    public readonly vacinaId?: number,
    public readonly medicamentoId?: number,
  ) {}
}
