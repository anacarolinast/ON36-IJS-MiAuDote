import { AdocaoEntity } from "src/adocoes/infrastructure/persistence/in-file/entities/adocao.entity";
import { PessoaEntity } from "src/pessoas/infrastructure/persistence/in-file/entities/pessoa.entity";

export class AdotanteEntity {
    id: number;
    renda: number;
    condicao_entrevista: string;
    pessoa_id: number;
    pessoa: PessoaEntity;
    adocao?: AdocaoEntity[];
  }
  