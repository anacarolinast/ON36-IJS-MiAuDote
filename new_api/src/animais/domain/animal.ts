import { Adocao } from 'src/adocoes/domain/adocao';
import { Medicamento } from 'src/medicamentos/domain/medicamentos';
import { Vacina } from 'src/vacinas/domain/vacinas';
import { Castracao } from 'src/castracoes/domain/castracao';

export class Animal {
    constructor(
      public readonly id: number,
      public readonly nome: string,
      public readonly especie: string,
      public readonly sexo: string,
      public readonly data_nascimento: Date,
      public readonly condicao_saude: string,
      public readonly estado_adocao: string,
      public readonly adocao?: Adocao,
      public readonly medicamentos?: Medicamento[],
      public readonly vacinas?: Vacina[],
      public readonly castracao?: Castracao
    ) {}
  }
  