import { Injectable } from '@nestjs/common';
import { DoacaoRepository } from '../../../../../doacoes/application/ports/doacao.repository';
import { Doacao } from '../../../../../doacoes/domain/doacoes';
import { DoacaoEntity } from '../entities/doacao.entity';
import { DoacaoMapper } from '../mappers/doacao.mapper';
import { Doador } from '../../../../../doadores/domain/doadores';
import { Gasto } from '../../../../../gastos/domain/gastos';

@Injectable()
export class TypeOrmDoacaoRepository implements DoacaoRepository {
    private readonly doacoes = new Map<number, DoacaoEntity>();
    constructor(private readonly doacaoMapper: DoacaoMapper) {}

    async save(doacao: Doacao): Promise<Doacao> {
        const persistenceModel = await this.doacaoMapper.paraPersistencia(doacao);
        this.doacoes.set(persistenceModel.id, persistenceModel);
        const newEntity = this.doacoes.get(persistenceModel.id);
        
        return this.doacaoMapper.paraDominio(newEntity);
    }

    async findAll(): Promise<Doacao[]> {
        const entities = Array.from(this.doacoes.values());
        return Promise.all(entities.map((item) => this.doacaoMapper.paraDominio(item)));
    }

    async findById(id: number): Promise<Doacao | null> {
        const entities = Array.from(this.doacoes.values());
        const doacaoEncontrada = entities.find((item) => item.id === id);
        if (!doacaoEncontrada) return null;
        return this.doacaoMapper.paraDominio(doacaoEncontrada);
    }

    async update(id: number, doacao: Partial<Doacao>): Promise<Doacao | null> {
        const existingDoacaoEntity = this.doacoes.get(id);
        if (existingDoacaoEntity) {
            const existingDoacao = this.doacaoMapper.paraDominio(existingDoacaoEntity);
            
            const updatedDoacao = {
                ...existingDoacao,
                ...doacao,
            };
            const updatedDoacaoEntity = await this.doacaoMapper.paraPersistencia(updatedDoacao);
            
            this.doacoes.set(id, updatedDoacaoEntity);
            console.log(`Doacao com ID ${id} atualizada com sucesso!`);
            return this.doacaoMapper.paraDominio(updatedDoacaoEntity);
        } else {
            console.log(`Doacao com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.doacoes.has(id)) {
            this.doacoes.delete(id);
            console.log(`Doacao com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Doacao com ID ${id} não encontrada para remoção.`);
        }
    }

}

