import { Adocao } from "src/adocoes/domain/adocao";
import { Castracao } from "src/castracoes/domain/castracao";
import { Medicamento } from "src/medicamentos/domain/medicamentos";
import { Vacina } from "src/vacinas/domain/vacinas";


export class AnimalEntity {
  id: number;
  nome: string;
  especie: string;
  sexo: string;
  data_nascimento: Date;
  condicao_saude: string;
  estado_adocao: string;
  adocao?: Adocao;
  medicamentos?: Medicamento[];
  vacinas?: Vacina[];
  castracao?: Castracao;
}