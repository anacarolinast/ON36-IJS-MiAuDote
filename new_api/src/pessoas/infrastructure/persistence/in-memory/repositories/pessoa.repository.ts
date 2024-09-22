import { Injectable } from "@nestjs/common";
import { PessoaRepository } from "src/pessoas/application/ports/pessoas.repository";
import { Pessoa } from "src/pessoas/domain/pessoas";
import { PessoaEntity } from "../entities/pessoa.entity";
import { PessoaMapper } from "../mappers/pessoa.mapper";

@Injectable()
export class InMemoryPessoaRepository implements PessoaRepository {
    private readonly pessoas = new Map<number, PessoaEntity>();
    private idCounter = 1;

    async save(pessoa: Pessoa): Promise<Pessoa> {
        const pessoaEntity = PessoaMapper.paraPersistencia(pessoa);
        pessoaEntity.id = this.idCounter++;
        this.pessoas.set(pessoaEntity.id, pessoaEntity);
        console.log(`Pessoa ${pessoaEntity.id} criada com sucesso!`);
        return PessoaMapper.paraDominio(pessoaEntity);
    }

    async findAll(): Promise<Pessoa[]> {
        console.log("Listando todas as pessoas...");
        return Array.from(this.pessoas.values());
    }

    async findById(id: number): Promise<Pessoa | null> {
        const pessoa = this.pessoas.get(id);
        if (pessoa) {
            console.log(`Pessoa encontrada: ${pessoa.id}`);
            return pessoa;
        } else {
            console.log(`Pessoa com ID ${id} não encontrada.`);
            return null;
        }
    }

    async update(id: number, pessoa: Partial<Pessoa>): Promise<Pessoa | null> {
        const existingPessoa = this.pessoas.get(id);
        if (existingPessoa) {
            const updatedAdotante = { ...existingPessoa, ...pessoa } as PessoaEntity;
            this.pessoas.set(id, updatedAdotante);
            console.log(`Pessoa com ID ${id} atualizada com sucesso!`);
            return updatedAdotante;
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