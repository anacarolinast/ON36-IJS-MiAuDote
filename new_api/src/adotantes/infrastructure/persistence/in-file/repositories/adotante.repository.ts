import { Injectable, NotFoundException } from "@nestjs/common";
import { AdotanteRepository } from "src/adotantes/application/ports/adotantes.repository";
import { Adotante } from "src/adotantes/domain/adotante";
import { AdotanteEntity } from "../entities/adotante.entity";
import { AdotanteMapper } from "../mappers/adotante.mappers";
import { Adocao } from "src/adocoes/domain/adocao";
import { AdocaoMapper } from "src/adocoes/infrastructure/persistence/in-file/mappers/adocoes.mapper";

@Injectable()
export class InFileAdotanteRepository implements AdotanteRepository {
    private readonly adotantes = new Map<number, AdotanteEntity>();
    private idCounter = 1;

    async save(adotante: Adotante): Promise<Adotante> {
        const adotanteEntity = AdotanteMapper.paraPersistencia(adotante);
        adotanteEntity.id = this.idCounter++;
        this.adotantes.set(adotanteEntity.id, adotanteEntity);
        console.log(`Adotante ${adotanteEntity.id} criado com sucesso!`);
        return AdotanteMapper.paraDominio(adotanteEntity);
    }

    async findAll(): Promise<Adotante[]> {
        console.log("Listando todas as adotantes...");
        return Array.from(this.adotantes.values()).map(adotanteEntity =>
            AdotanteMapper.paraDominio(adotanteEntity)
        );
    }

    async findById(id: number): Promise<Adotante | null> {
        const adotanteEntity = this.adotantes.get(id);
        if (adotanteEntity) {
            console.log(`Adotante encontrada: ${adotanteEntity.id}`);
            return AdotanteMapper.paraDominio(adotanteEntity);
        } else {
            console.log(`Adotante com ID ${id} não encontrada.`);
            return null;
        }
    }

    async update(id: number, adotante: Partial<Adotante>): Promise<Adotante | null> {
        const existingAdotanteEntity = this.adotantes.get(id);
        if (existingAdotanteEntity) {
            const existingAdotante = AdotanteMapper.paraDominio(existingAdotanteEntity);
    
            const updatedAdotante = {
                ...existingAdotante,
                ...adotante,
                adocao: existingAdotante.adocao
            };
    
            const updatedAdotanteEntity = AdotanteMapper.paraPersistencia(updatedAdotante);
            
            this.adotantes.set(id, updatedAdotanteEntity);
            console.log(`Adotante com ID ${id} atualizada com sucesso!`);
            return updatedAdotante;
        } else {
            console.log(`Adotante com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }
    
    async remove(id: number): Promise<void> {
        if (this.adotantes.has(id)) {
            this.adotantes.delete(id);
            console.log(`Adotante com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Adotante com ID ${id} não encontrada para remoção.`);
        }
    }
}
