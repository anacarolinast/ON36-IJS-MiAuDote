import { Adocao } from 'src/adocoes/entities/adocao.entity';
import { Medicamento } from 'src/medicamentos/entities/medicamento.entity';
import { Vacina } from 'src/vacinas/entities/vacina.entity';
import { Castracao } from 'src/castracoes/entities/castracao.entity';

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
  