import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdocaoRepository } from 'src/adocoes/application/ports/adocoes.repository';
import { Adocao } from 'src/adocoes/domain/adocao';
import { AdocaoEntity } from '../entities/adocao.entity';
import { AdocaoMapper } from '../mappers/adocoes.mapper';

@Injectable()
export class InMemoryAdocaoRepository implements AdocaoRepository {
    private readonly adocoes = new Map<number, AdocaoEntity>();
    private idCounter = 1;
    animalRepository: any;
    adotanteRepository: any;

    async save(adocao: Adocao): Promise<Adocao> {
        const adocaoEntity = AdocaoMapper.paraPersistencia(adocao);
        adocaoEntity.id = this.idCounter++;
        this.adocoes.set(adocaoEntity.id, adocaoEntity);

        console.log(`Adoção criada com sucesso!`); 
        return AdocaoMapper.paraDominio(adocaoEntity);
    }

    async findAll(): Promise<Adocao[]> {
        console.log("Listando todas as adocoes...");
        return Array.from(this.adocoes.values());
    }

    async findById(id: number): Promise<Adocao | null> {
        const adocao = this.adocoes.get(id);
        if (adocao) {
            console.log(`Adocao encontrada: ${adocao.animal_id}`);
            return adocao;
        } else {
            console.log(`Adocao com ID ${id} não encontrada.`);
            return null;
        }
    }

    async update(id: number, adocao: Partial<Adocao>): Promise<Adocao | null> {
        const existingAdocao = this.adocoes.get(id);
        if (existingAdocao) {
            const updatedAdocao = AdocaoMapper.paraPersistencia({ ...existingAdocao, ...adocao });
            this.adocoes.set(id, updatedAdocao);
            console.log(`Adocao com ID ${id} atualizada com sucesso!`);
            return updatedAdocao;
        } else {
            console.log(`Adocao com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.adocoes.has(id)) {
            this.adocoes.delete(id);
            console.log(`Adocao com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Adocao com ID ${id} não encontrada para remoção.`);
        }
    }
}
