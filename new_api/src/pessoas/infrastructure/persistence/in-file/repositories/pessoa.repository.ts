import { Injectable } from "@nestjs/common";
import { PessoaRepository } from "src/pessoas/application/ports/pessoas.repository";
import { Pessoa } from "src/pessoas/domain/pessoas";
import { PessoaEntity } from "../entities/pessoa.entity";

@Injectable()
export class InFilePessoaRepository implements PessoaRepository {
    async save(pessoa: Pessoa): Promise<Pessoa> {
        throw new Error('Method not implemented.');
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

    private readonly pessoa = new Map<String, PessoaEntity>();
}