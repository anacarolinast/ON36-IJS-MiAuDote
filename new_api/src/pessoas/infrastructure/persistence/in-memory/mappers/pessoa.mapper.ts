import { Pessoa } from "src/pessoas/domain/pessoas";
import { PessoaEntity } from "../entities/pessoa.entity";

export class PessoaMapper {
    static paraDominio(pessoaEntity: PessoaEntity): Pessoa {
        const model = new Pessoa(
            pessoaEntity.id,
            pessoaEntity.nome,
            pessoaEntity.endereco,
            pessoaEntity.telefone,
            pessoaEntity.email,
            pessoaEntity.cpf,
            // pessoaEntity.veterinario,
            // pessoaEntity.adotante,
            // pessoaEntity.doador
        );
        return model;
    }

    static paraPersistencia(pessoa: Pessoa): PessoaEntity {
        const entity = new PessoaEntity();
        entity.id = pessoa.id;
        entity.nome = pessoa.nome;
        entity.endereco = pessoa.endereco;
        entity.telefone = pessoa.telefone;
        entity.email = pessoa.email;
        entity.cpf = pessoa.cpf;
        // entity.veterinario = pessoa.veterinario;
        // entity.adotante = pessoa.adotante;
        // entity.doador = pessoa.doador;
        return entity;
    }
}