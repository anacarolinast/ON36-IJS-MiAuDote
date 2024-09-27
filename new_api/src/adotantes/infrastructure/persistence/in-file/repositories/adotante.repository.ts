import { Injectable, NotFoundException } from "@nestjs/common";
import { AdotanteRepository } from "src/adotantes/application/ports/adotantes.repository";
import { Adotante } from "src/adotantes/domain/adotante";
import { AdotanteEntity } from "../entities/adotante.entity";
import { AdotanteMapper } from "../mappers/adotante.mappers";
import { Adocao } from "src/adocoes/domain/adocao";


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
        console.log("Listando todos os adotantes...");
        return Array.from(this.adotantes.values()).map(adotanteEntity =>
            AdotanteMapper.paraDominio(adotanteEntity)
        );
    }

    async findById(id: number): Promise<Adotante | null> {
        const adotanteEntity = this.adotantes.get(id);
        if (adotanteEntity) {
            console.log(`Adotante encontrado: ${adotanteEntity.id}`);
            return AdotanteMapper.paraDominio(adotanteEntity);
        } else {
            console.log(`Adotante com ID ${id} não encontrado.`);
            return null;
        }
    }

    async update(id: number, dadosAtualizados: Partial<Adotante>): Promise<Adotante | null> {
        const adotanteEntity = this.adotantes.get(id);
        
        if (adotanteEntity) {
            Object.assign(adotanteEntity, dadosAtualizados);

            this.adotantes.set(id, adotanteEntity);
            console.log(`Adotante com ID ${id} atualizado com sucesso!`);
            
            return AdotanteMapper.paraDominio(adotanteEntity);
        } else {
            console.log(`Adotante com ID ${id} não encontrada.`);
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

    async adopt(adotanteId: number, novaAdocao: Adocao): Promise<Adotante | null> {
        const adotanteEntity = this.adotantes.get(adotanteId);
    
        if (adotanteEntity) {
            const adotante = AdotanteMapper.paraDominio(adotanteEntity);
            console.log('Adotante antes de adicionar a nova adoção:', adotante);
            adotante.adocao.push(novaAdocao);
            console.log('Adotante após adicionar nova adoção:', adotante);

            const updatedAdotanteEntity = AdotanteMapper.paraPersistencia(adotante);
            this.adotantes.set(adotanteId, updatedAdotanteEntity);
            console.log(`Adotante com ID ${adotanteId} atualizado com nova adoção no repositório.`);
    
            return adotante;
        } else {
            console.log(`Adotante com ID ${adotanteId} não encontrado para adicionar adoção.`);
        }
    }
}
