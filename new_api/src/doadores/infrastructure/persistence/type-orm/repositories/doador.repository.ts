import { Injectable } from '@nestjs/common';
import { DoadorRepository } from '../../../../../doadores/application/ports/doador.repository';
import { Doador } from '../../../../../doadores/domain/doadores';
import { DoadorEntity } from '../entities/doador.entity';
import { DoadorMapper } from '../mappers/doador.mapper';
import { Doacao } from '../../../../../doacoes/domain/doacoes';
import { Pessoa } from '../../../../../pessoas/domain/pessoas';

@Injectable()
export class TypeOrmDoadorRepository implements DoadorRepository {
    private readonly doadores = new Map<number, DoadorEntity>();
    constructor(private readonly doadorMapper: DoadorMapper) {}

    async save(doador: Doador): Promise<Doador> {
        const persistenceModel = await this.doadorMapper.paraPersistencia(doador);
        this.doadores.set(persistenceModel.id, persistenceModel);
        const newEntity = this.doadores.get(persistenceModel.id);
        
        return this.doadorMapper.paraDominio(newEntity);
    }

    async findAll(): Promise<Doador[]> {
        const entities = Array.from(this.doadores.values());
        return Promise.all(entities.map((item) => this.doadorMapper.paraDominio(item)));
    }

    async findById(id: number): Promise<Doador | null> {
        const entities = Array.from(this.doadores.values());
        const doadorEncontrada = entities.find((item) => item.id === id);
        if (!doadorEncontrada) return null;
        return this.doadorMapper.paraDominio(doadorEncontrada);
    }

    async update(id: number, doador: Partial<Doador>): Promise<Doador | null> {
        const existingDoadorEntity = this.doadores.get(id);
        if (existingDoadorEntity) {
            const existingDoador = this.doadorMapper.paraDominio(existingDoadorEntity);
            
            const updatedDoador = {
                ...existingDoador,
                ...doador,
            };
            const updatedDoadorEntity = await this.doadorMapper.paraPersistencia(updatedDoador);
            
            this.doadores.set(id, updatedDoadorEntity);
            console.log(`Doador com ID ${id} atualizada com sucesso!`);
            return this.doadorMapper.paraDominio(updatedDoadorEntity);
        } else {
            console.log(`Doador com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.doadores.has(id)) {
            this.doadores.delete(id);
            console.log(`Doador com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Doador com ID ${id} não encontrada para remoção.`);
        }
    }

    async donate(doacaoId: number, doacao: Doacao): Promise<Doador | null> {
        // Apenas imprime uma mensagem de log e retorna null -- IMPLEMENTAR
        console.log(`Tentativa de doação para o animal com ID ${doacaoId}.`);
        return null; // Retorna nulo
    }

}

