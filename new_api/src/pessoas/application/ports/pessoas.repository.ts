import { Injectable } from "@nestjs/common";
import { Pessoa } from "src/pessoas/domain/pessoas";

@Injectable()
export abstract class PessoaRepository {
    abstract save(pessoa: Pessoa): Promise<Pessoa>;
    abstract findAll(): Promise<Pessoa[]>;
    abstract findById(id: number): Promise<Pessoa | null>;
    abstract findByCpf (cpf: string): Promise <Pessoa | null>;
    abstract update(id: number, pessoa: Partial<Pessoa>): Promise<Pessoa | null>;
    abstract remove(id: number): Promise<void>;
}