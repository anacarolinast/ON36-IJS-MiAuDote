import { Injectable } from '@nestjs/common';
import { AdocaoRepository } from '../../../../../adocoes/application/ports/adocoes.repository';
import { Adocao } from '../../../../../adocoes/domain/adocao';
import { AdocaoEntity } from '../entities/adocao.entity';
import { AdocaoMapper } from '../mappers/adocao.mapper';

@Injectable()
export class TypeOrmAdocaoRepository implements AdocaoRepository {
    private readonly adocoes = new Map<number, AdocaoEntity>();
    constructor(private readonly adocaoMapper: AdocaoMapper) {}

    async save(adocao: Adocao): Promise<Adocao> {
        const persistenceModel = await this.adocaoMapper.paraPersistencia(adocao);
        this.adocoes.set(persistenceModel.id, persistenceModel);
        const newEntity = this.adocoes.get(persistenceModel.id);
        
        return this.adocaoMapper.paraDominio(newEntity);
    }

    async findAll(): Promise<Adocao[]> {
        const entities = Array.from(this.adocoes.values());
        return Promise.all(entities.map((item) => this.adocaoMapper.paraDominio(item)));
    }

    async findById(id: number): Promise<Adocao | null> {
        const entities = Array.from(this.adocoes.values());
        const adocaoEncontrada = entities.find((item) => item.id === id);
        if (!adocaoEncontrada) return null;
        return this.adocaoMapper.paraDominio(adocaoEncontrada);
    }

    async update(id: number, adocao: Partial<Adocao>): Promise<Adocao | null> {
        const existingAdocaoEntity = this.adocoes.get(id);
        if (existingAdocaoEntity) {
            const existingAdocao = this.adocaoMapper.paraDominio(existingAdocaoEntity);
            
            const updatedAdocao = {
                ...existingAdocao,
                ...adocao,
            };
            const updatedAdocaoEntity = await this.adocaoMapper.paraPersistencia(updatedAdocao);
            
            this.adocoes.set(id, updatedAdocaoEntity);
            console.log(`Adoção com ID ${id} atualizada com sucesso!`);
            return this.adocaoMapper.paraDominio(updatedAdocaoEntity);
        } else {
            console.log(`Adoção com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.adocoes.has(id)) {
            this.adocoes.delete(id);
            console.log(`Adoção com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Adoção com ID ${id} não encontrada para remoção.`);
        }
    }
}
