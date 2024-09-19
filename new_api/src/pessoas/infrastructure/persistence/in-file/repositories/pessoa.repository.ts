import { Injectable } from "@nestjs/common";
import { PessoaRepository } from "src/pessoas/application/ports/pessoas.repository";
import { Pessoa } from "src/pessoas/domain/pessoas";
import { PessoaEntity } from "../entities/pessoa.entity";

@Injectable()
export class InFilePessoaRepository implements PessoaRepository {
    private readonly pessoas = new Map<number, PessoaEntity>();
    private idCounter = 1;

    async save(pessoa: Pessoa): Promise<Pessoa> {
        const pessoaEntity = new PessoaEntity();
        pessoaEntity.id = this.idCounter++;
        pessoaEntity.nome = pessoa.nome;
        pessoaEntity.endereco = pessoa.endereco;
        pessoaEntity.telefone = pessoa.telefone;
        pessoaEntity.email = pessoa.email;
        pessoaEntity.cpf = pessoa.cpf;

        this.pessoas.set(pessoaEntity.id, pessoaEntity);

        console.log(`Pessoa ${pessoaEntity.nome} criada com sucesso!`); 
        return pessoaEntity;
    }

    async findAll(): Promise<Pessoa[]> {
        throw new Error('Method not implemented.');
    }

    async findById(id: number): Promise<Pessoa | null> {
        throw new Error('Method not implemented.');
    }

    async update(id: number, pessoa: Partial<Pessoa>): Promise<Pessoa | null> {
        throw new Error('Method not implemented.');
    }

    async remove(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
