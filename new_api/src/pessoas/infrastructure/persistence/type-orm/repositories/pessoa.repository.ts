import { Injectable } from '@nestjs/common';
import { PessoaRepository } from '../../../../../pessoas/application/ports/pessoas.repository';
import { Pessoa } from '../../../../../pessoas/domain/pessoas';
import { PessoaEntity } from '../entities/pessoa.entity';
import { PessoaMapper } from '../mappers/pessoa.mapper';
import { Doador } from '../../../../../doadores/domain/doadores';
import { Veterinario } from '../../../../../veterinarios/domain/veterinarios';
import { Adotante } from '../../../../../adotantes/domain/adotante';

@Injectable()
export class TypeOrmPessoaRepository implements PessoaRepository {
    private readonly pessoas = new Map<number, PessoaEntity>();
    constructor(private readonly pessoaMapper: PessoaMapper) {}

    async save(pessoa: Pessoa): Promise<Pessoa> {
        const persistenceModel = await this.pessoaMapper.paraPersistencia(pessoa);
        this.pessoas.set(persistenceModel.id, persistenceModel);
        const newEntity = this.pessoas.get(persistenceModel.id);
        
        return this.pessoaMapper.paraDominio(newEntity);
    }

    async findAll(): Promise<Pessoa[]> {
        const entities = Array.from(this.pessoas.values());
        return Promise.all(entities.map((item) => this.pessoaMapper.paraDominio(item)));
    }

    async findByCpf(cpf: string): Promise<Pessoa | null> {
        return null;
    }

    async findById(id: number): Promise<Pessoa | null> {
        const entities = Array.from(this.pessoas.values());
        const pessoaEncontrada = entities.find((item) => item.id === id);
        if (!pessoaEncontrada) return null;
        return this.pessoaMapper.paraDominio(pessoaEncontrada);
    }

    async update(id: number, pessoa: Partial<Pessoa>): Promise<Pessoa | null> {
        const existingPessoaEntity = this.pessoas.get(id);
        if (existingPessoaEntity) {
            const existingPessoa = this.pessoaMapper.paraDominio(existingPessoaEntity);
            
            const updatedPessoa = {
                ...existingPessoa,
                ...pessoa,
            };
            const updatedPessoaEntity = await this.pessoaMapper.paraPersistencia(updatedPessoa);
            
            this.pessoas.set(id, updatedPessoaEntity);
            console.log(`Pessoa com ID ${id} atualizada com sucesso!`);
            return this.pessoaMapper.paraDominio(updatedPessoaEntity);
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

