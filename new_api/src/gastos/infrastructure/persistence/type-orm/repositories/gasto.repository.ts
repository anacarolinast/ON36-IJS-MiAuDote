import { Injectable } from '@nestjs/common';
import { GastoRepository } from '../../../../../gastos/application/ports/gasto.repository';
import { Gasto } from '../../../../../gastos/domain/gastos';
import { GastoEntity } from '../entities/gasto.entity';
import { GastoMapper } from '../mappers/gasto.mapper';
import { Consumivel } from '../../../../../consumiveis/domain/consumivel';
import { Doacao } from '../../../../../doacoes/domain/doacoes';
import { Castracao } from '../../../../../castracoes/domain/castracao';
import { Vacina } from '../../../../../vacinas/domain/vacinas';
import { Medicamento } from '../../../../../medicamentos/domain/medicamentos';

@Injectable()
export class TypeOrmGastoRepository implements GastoRepository {
    private readonly gastos = new Map<number, GastoEntity>();
    constructor(private readonly gastoMapper: GastoMapper) {}

    async save(gasto: Gasto): Promise<Gasto> {
        const persistenceModel = await this.gastoMapper.paraPersistencia(gasto);
        this.gastos.set(persistenceModel.id, persistenceModel);
        const newEntity = this.gastos.get(persistenceModel.id);
        
        return this.gastoMapper.paraDominio(newEntity);
    }

    async findAll(): Promise<Gasto[]> {
        const entities = Array.from(this.gastos.values());
        return Promise.all(entities.map((item) => this.gastoMapper.paraDominio(item)));
    }

    async findById(id: number): Promise<Gasto | null> {
        const entities = Array.from(this.gastos.values());
        const gastoEncontrada = entities.find((item) => item.id === id);
        if (!gastoEncontrada) return null;
        return this.gastoMapper.paraDominio(gastoEncontrada);
    }

    async update(id: number, gasto: Partial<Gasto>): Promise<Gasto | null> {
        const existingGastoEntity = this.gastos.get(id);
        if (existingGastoEntity) {
            const existingGasto = this.gastoMapper.paraDominio(existingGastoEntity);
            
            const updatedGasto = {
                ...existingGasto,
                ...gasto,
            };
            const updatedGastoEntity = await this.gastoMapper.paraPersistencia(updatedGasto);
            
            this.gastos.set(id, updatedGastoEntity);
            console.log(`Gasto com ID ${id} atualizada com sucesso!`);
            return this.gastoMapper.paraDominio(updatedGastoEntity);
        } else {
            console.log(`Gasto com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.gastos.has(id)) {
            this.gastos.delete(id);
            console.log(`Gasto com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Gasto com ID ${id} não encontrada para remoção.`);
        }
    }

}

