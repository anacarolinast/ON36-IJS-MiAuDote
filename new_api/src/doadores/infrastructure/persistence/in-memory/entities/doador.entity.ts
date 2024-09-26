import { PessoaEntity } from "src/pessoas/infrastructure/persistence/in-memory/entities/pessoa.entity";
import { DoacaoEntity } from "src/doacoes/infrastructure/persistence/in-memory/entities/doacao.entity";

export class DoadorEntity {
    id: number;
    tipo_doacao: string;
    descricao: string;
    pessoa_id: number;
    pessoa: PessoaEntity;
    doacao: DoacaoEntity[]
  }
  
  