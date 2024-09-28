import { Pessoa } from "src/pessoas/domain/pessoas";
import { PessoaEntity } from "../entities/pessoa.entity";

export class PessoaMapper {
    static paraDominio(pessoaEntity: PessoaEntity): Pessoa {
        const model = new Pessoa(
            pessoaEntity.id,
            pessoaEntity.nome,
            pessoaEntity.cep,
            pessoaEntity.endereco,
            pessoaEntity.telefone,
            pessoaEntity.email,
            pessoaEntity.cpf,
        );
        return model;
    }

    static paraPersistencia(pessoa: Pessoa): PessoaEntity {
        const entity = new PessoaEntity();
        entity.id = pessoa.id;
        entity.nome = pessoa.nome;
        entity.cep = pessoa.cep;
        entity.endereco = pessoa.endereco;
        entity.telefone = pessoa.telefone;
        entity.email = pessoa.email;
        entity.cpf = pessoa.cpf;
        return entity;
    }
}