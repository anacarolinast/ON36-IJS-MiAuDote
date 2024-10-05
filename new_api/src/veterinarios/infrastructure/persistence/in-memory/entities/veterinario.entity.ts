import { CastracaoEntity } from "src/castracoes/infrastructure/persistence/in-memory/entities/castracao.entity";
import { MedicamentoEntity } from "src/medicamentos/infrastructure/persistence/in-memory/entities/medicamento.entity";
import { PessoaEntity } from "src/pessoas/infrastructure/persistence/in-memory/entities/pessoa.entity";
import { VacinaEntity } from "src/vacinas/infrastructure/persistence/in-memory/entities/vacina.entity";

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