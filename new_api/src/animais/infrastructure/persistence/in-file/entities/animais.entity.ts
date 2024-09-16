import { Adocao } from 'src/adocoes/entities/adocao.entity';
import { Castracao } from 'src/castracoes/entities/castracao.entity';
import { Medicamento } from 'src/medicamentos/entities/medicamento.entity';
import { Vacina } from 'src/vacinas/entities/vacina.entity';

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
