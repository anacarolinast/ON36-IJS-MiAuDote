import { Injectable } from '@nestjs/common';
import { ConsumivelRepository } from '../../../../../consumiveis/application/ports/consumiveis.repository';
import { Consumivel } from '../../../../../consumiveis/domain/consumivel';
import { ConsumivelEntity } from '../entities/consumivel.entity';
import { ConsumivelMapper } from '../mappers/consumivel.mapper';
import { Gasto } from '../../../../../gastos/domain/gastos';

@Injectable()
export class TypeOrmConsumivelRepository implements ConsumivelRepository {
    private readonly consumiveis = new Map<number, ConsumivelEntity>();
    constructor(private readonly consumivelMapper: ConsumivelMapper) {}

    async save(consumivel: Consumivel): Promise<Consumivel> {
        const persistenceModel = await this.consumivelMapper.paraPersistencia(consumivel);
        this.consumiveis.set(persistenceModel.id, persistenceModel);
        const newEntity = this.consumiveis.get(persistenceModel.id);
        
        return this.consumivelMapper.paraDominio(newEntity);
    }

    async findAll(): Promise<Consumivel[]> {
        const entities = Array.from(this.consumiveis.values());
        return Promise.all(entities.map((item) => this.consumivelMapper.paraDominio(item)));
    }

    async findById(id: number): Promise<Consumivel | null> {
        const entities = Array.from(this.consumiveis.values());
        const consumivelEncontrada = entities.find((item) => item.id === id);
        if (!consumivelEncontrada) return null;
        return this.consumivelMapper.paraDominio(consumivelEncontrada);
    }

    async update(id: number, consumivel: Partial<Consumivel>): Promise<Consumivel | null> {
        const existingConsumivelEntity = this.consumiveis.get(id);
        if (existingConsumivelEntity) {
            const existingConsumivel = this.consumivelMapper.paraDominio(existingConsumivelEntity);
            
            const updatedConsumivel = {
                ...existingConsumivel,
                ...consumivel,
            };
            const updatedConsumivelEntity = await this.consumivelMapper.paraPersistencia(updatedConsumivel);
            
            this.consumiveis.set(id, updatedConsumivelEntity);
            console.log(`Consumivel com ID ${id} atualizada com sucesso!`);
            return this.consumivelMapper.paraDominio(updatedConsumivelEntity);
        } else {
            console.log(`Consumivel com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.consumiveis.has(id)) {
            this.consumiveis.delete(id);
            console.log(`Consumivel com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Consumivel com ID ${id} não encontrada para remoção.`);
        }
    }

}

