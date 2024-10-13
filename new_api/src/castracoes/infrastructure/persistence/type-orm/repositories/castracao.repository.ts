import { Injectable } from '@nestjs/common';
import { CastracaoRepository } from '../../../../../castracoes/application/ports/castracoes.repository';
import { Castracao } from '../../../../../castracoes/domain/castracao';
import { CastracaoEntity } from '../entities/castracao.entity';
import { CastracaoMapper } from '../mappers/castracao.mapper';
import { Gasto } from '../../../../../gastos/domain/gastos';
import { Animal } from '../../../../../animais/domain/animal';
import { Veterinario } from '../../../../../veterinarios/domain/veterinarios';

@Injectable()
export class TypeOrmCastracaoRepository implements CastracaoRepository {
    private readonly castracoes = new Map<number, CastracaoEntity>();
    constructor(private readonly castracaoMapper: CastracaoMapper) {}

    async save(castracao: Castracao): Promise<Castracao> {
        const persistenceModel = await this.castracaoMapper.paraPersistencia(castracao);
        this.castracoes.set(persistenceModel.id, persistenceModel);
        const newEntity = this.castracoes.get(persistenceModel.id);
        
        return this.castracaoMapper.paraDominio(newEntity);
    }

    async findAll(): Promise<Castracao[]> {
        const entities = Array.from(this.castracoes.values());
        return Promise.all(entities.map((item) => this.castracaoMapper.paraDominio(item)));
    }

    async findById(id: number): Promise<Castracao | null> {
        const entities = Array.from(this.castracoes.values());
        const castracaoEncontrada = entities.find((item) => item.id === id);
        if (!castracaoEncontrada) return null;
        return this.castracaoMapper.paraDominio(castracaoEncontrada);
    }

    async update(id: number, castracao: Partial<Castracao>): Promise<Castracao | null> {
        const existingCastracaoEntity = this.castracoes.get(id);
        if (existingCastracaoEntity) {
            const existingCastracao = this.castracaoMapper.paraDominio(existingCastracaoEntity);
            
            const updatedCastracao = {
                ...existingCastracao,
                ...castracao,
            };
            const updatedCastracaoEntity = await this.castracaoMapper.paraPersistencia(updatedCastracao);
            
            this.castracoes.set(id, updatedCastracaoEntity);
            console.log(`Castracao com ID ${id} atualizada com sucesso!`);
            return this.castracaoMapper.paraDominio(updatedCastracaoEntity);
        } else {
            console.log(`Castracao com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.castracoes.has(id)) {
            this.castracoes.delete(id);
            console.log(`Castracao com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Castracao com ID ${id} não encontrada para remoção.`);
        }
    }

}

