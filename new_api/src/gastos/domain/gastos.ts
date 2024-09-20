import { Castracao } from 'src/castracoes/domain/castracao';
import { Doacao } from 'src/doacoes/domain/doacoes';
import { Vacina } from 'src/vacinas/domain/vacinas';

export class Gasto {
    constructor(
      public readonly id: number,
      public readonly data_gasto: Date,
      public readonly tipo: string,
      public readonly quantidade: number,
      public readonly valor: number,
      public readonly castracao?: Castracao,
      public readonly doacao?: Doacao,
      public readonly vacina?: Vacina,
    ) {}
  }
  