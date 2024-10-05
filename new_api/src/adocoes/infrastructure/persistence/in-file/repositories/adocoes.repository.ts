import { Injectable } from "@nestjs/common";
import { AdocaoRepository } from "src/adocoes/application/ports/adocoes.repository";
import { Adocao } from "src/adocoes/domain/adocao";
import { AdocaoEntity } from "../entities/adocao.entity";
import { AdocaoMapper } from "../mappers/adocoes.mapper";

@Injectable()
export class InFileAdocaoRepository implements AdocaoRepository {
    private readonly adocoes = new Map<number, AdocaoEntity>();
    private idCounter = 1;

    async save(adocao: Adocao): Promise<Adocao> {
        const adocaoEntity = AdocaoMapper.paraPersistencia(adocao);
        adocaoEntity.id = this.idCounter++;
        this.adocoes.set(adocaoEntity.id, adocaoEntity);

        console.log(`Adoção criada com sucesso! ID: ${adocaoEntity.id}`); 
        return AdocaoMapper.paraDominio(adocaoEntity);
    }

    async findAll(): Promise<Adocao[]> {
        console.log("Listando todas as adoções...");
        return Array.from(this.adocoes.values()).map(AdocaoMapper.paraDominio);
    }

    async findById(id: number): Promise<Adocao | null> {
        const adocaoEntity = this.adocoes.get(id);
        if (adocaoEntity) {
            console.log(`Adoção encontrada: ${adocaoEntity.animal_id}`);
            return AdocaoMapper.paraDominio(adocaoEntity);
        } else {
            console.log(`Adoção com ID ${id} não encontrada.`);
            return null;
        }
    }

    async update(id: number, adocao: Partial<Adocao>): Promise<Adocao | null> {
        const existingAdocaoEntity = this.adocoes.get(id);
        if (existingAdocaoEntity) {
            const updatedAdocaoEntity = AdocaoMapper.paraPersistencia({
                ...AdocaoMapper.paraDominio(existingAdocaoEntity),
                ...adocao,
            });

            this.adocoes.set(id, updatedAdocaoEntity);
            console.log(`Adoção com ID ${id} atualizada com sucesso!`);
            return AdocaoMapper.paraDominio(updatedAdocaoEntity);
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
