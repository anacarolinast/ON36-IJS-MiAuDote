import { CastracaoEntity } from "src/castracoes/infrastructure/persistence/in-file/entities/castracao.entity";
import { MedicamentoEntity } from "src/medicamentos/infrastructure/persistence/in-file/entities/medicamento.entity";
import { PessoaEntity } from "src/pessoas/infrastructure/persistence/in-file/entities/pessoa.entity";
import { VacinaEntity } from "src/vacinas/infrastructure/persistence/in-file/entities/vacina.entity";

export class VeterinarioEntity {
    id: number;
    especialidade: string;
    registro_crmv: string;
    pessoa_id: number;
    pessoa: PessoaEntity;
    vacina?: VacinaEntity[];
    medicamento?: MedicamentoEntity[];
    castracao?: CastracaoEntity[];
}