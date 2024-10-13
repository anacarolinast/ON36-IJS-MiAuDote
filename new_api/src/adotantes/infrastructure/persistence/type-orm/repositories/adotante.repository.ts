import { Injectable } from '@nestjs/common';
import { AdotanteRepository } from '../../../../../adotantes/application/ports/adotantes.repository';
import { Adotante } from '../../../../../adotantes/domain/adotante';
import { AdotanteEntity } from '../entities/adotante.entity';
import { AdotanteMapper } from '../mappers/adotante.mapper';
import { Adocao } from 'src/adocoes/domain/adocao'; 

@Injectable()
export class TypeOrmAdotanteRepository implements AdotanteRepository {
    private readonly adotantes = new Map<number, AdotanteEntity>();
    constructor(private readonly adotanteMapper: AdotanteMapper) {}

    async save(adotante: Adotante): Promise<Adotante> {
        const persistenceModel = await this.adotanteMapper.paraPersistencia(adotante);
        this.adotantes.set(persistenceModel.id, persistenceModel);
        const newEntity = this.adotantes.get(persistenceModel.id);
        
        return this.adotanteMapper.paraDominio(newEntity);
    }

    async findAll(): Promise<Adotante[]> {
        const entities = Array.from(this.adotantes.values());
        return Promise.all(entities.map((item) => this.adotanteMapper.paraDominio(item)));
    }

    async findById(id: number): Promise<Adotante | null> {
        const entities = Array.from(this.adotantes.values());
        const adotanteEncontrado = entities.find((item) => item.id === id);
        if (!adotanteEncontrado) return null;
        return this.adotanteMapper.paraDominio(adotanteEncontrado);
    }

    async update(id: number, adotante: Partial<Adotante>): Promise<Adotante | null> {
        const existingAdotanteEntity = this.adotantes.get(id);
        if (existingAdotanteEntity) {
            const existingAdocao = this.adotanteMapper.paraDominio(existingAdotanteEntity);
            
            const updatedAdotante = {
                ...existingAdocao,
                ...adotante,
            };
            const updatedAdotanteEntity = await this.adotanteMapper.paraPersistencia(updatedAdotante);
            
            this.adotantes.set(id, updatedAdotanteEntity);
            console.log(`Adotante com ID ${id} atualizado com sucesso!`);
            return this.adotanteMapper.paraDominio(updatedAdotanteEntity);
        } else {
            console.log(`Adotante com ID ${id} não encontrado para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.adotantes.has(id)) {
            this.adotantes.delete(id);
            console.log(`Adotante com ID ${id} removido com sucesso!`);
        } else {
            console.log(`Adotante com ID ${id} não encontrado para remoção.`);
        }
    }

    async adopt(adotanteId: number, adocao: Adocao): Promise<Adotante | null> {
        // Apenas imprime uma mensagem de log e retorna null -- IMPLEMENTAR
        console.log(`Tentativa de adoção para o adotante com ID ${adotanteId}.`);
        return null; // Retorna nulo
    }
}    
    
