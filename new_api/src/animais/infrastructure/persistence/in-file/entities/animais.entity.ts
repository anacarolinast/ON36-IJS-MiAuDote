import { AdocaoEntity } from "src/adocoes/infrastructure/persistence/in-file/entities/adocao.entity";
import { CastracaoEntity } from "src/castracoes/infrastructure/persistence/in-file/entities/castracao.entity";
import { MedicamentoEntity } from "src/medicamentos/infrastructure/persistence/in-file/entities/medicamento.entity";
import { VacinaEntity } from "src/vacinas/infrastructure/persistence/in-file/entities/vacina.entity";

export class AnimalEntity {
  id: number;
  nome: string;
  especie: string;
  sexo: string;
  data_nascimento: Date;
  condicao_saude: string;
  estado_adocao: string;
  adocao?: AdocaoEntity;
  medicamentos?: MedicamentoEntity[];
  vacinas?: VacinaEntity[];
  castracao?: CastracaoEntity;
}
