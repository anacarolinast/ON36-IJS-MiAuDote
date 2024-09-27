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
    
    async findPessoa(id: number): Promise <Pessoa | null> {
        console.log("Listando todas as pessoas...");
        return null;
    }

    async findAll(): Promise<Pessoa[]> {
        console.log("Listando todas as pessoas...");
        return Array.from(this.pessoas.values());
    }

    async findById(id: number): Promise<Pessoa | null> {
        const pessoa = this.pessoas.get(id);
        if (pessoa) {
            console.log(`Pessoa encontrada: ${pessoa.nome}`);
            return pessoa;
        } else {
            console.log(`Pessoa com ID ${id} não encontrada.`);
            return null;
        }
    }

    async update(id: number, pessoa: Partial<Pessoa>): Promise<Pessoa | null> {
        const existingPessoa = this.pessoas.get(id);
        if (existingPessoa) {
            const updatedPessoa = { ...existingPessoa, ...pessoa };
            this.pessoas.set(id, updatedPessoa);
            console.log(`Pessoa com ID ${id} atualizada com sucesso!`);
            return updatedPessoa;
        } else {
            console.log(`Pessoa com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.pessoas.has(id)) {
            this.pessoas.delete(id);
            console.log(`Pessoa com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Pessoa com ID ${id} não encontrada para remoção.`);
        }
    }
}
