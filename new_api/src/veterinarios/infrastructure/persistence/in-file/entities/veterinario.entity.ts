import { PessoaEntity } from "src/pessoas/infrastructure/persistence/in-file/entities/pessoa.entity";

export class VeterinarioEntity {
    id: number;
    especialidade: string;
    registro_crmv: string;
    pessoa_id: number;
    pessoa: PessoaEntity;
    // vacinas: any[];
    // medicamentos: any[];
    // castracoes: any[];
}