import { Injectable } from "@nestjs/common";
import { AdotanteRepository } from "src/adotantes/application/ports/adotantes.repository";
import { Adotante } from "src/adotantes/domain/adotante";
import { AdotanteEntity } from "../entities/adotante.entity";

@Injectable()
export class InFileAdotanteRepository implements AdotanteRepository {
    private readonly adotantes = new Map<number, AdotanteEntity>();
    private idCounter = 1;

    async save(adotante: Adotante): Promise<Adotante> {
        const adotanteEntity = new AdotanteEntity();
        adotanteEntity.id = this.idCounter++;
        adotanteEntity.renda = adotante.renda;
        adotanteEntity.condicao_entrevista = adotante.condicao_entrevista;
        adotanteEntity.pessoa_id = adotante.pessoa_id;

        this.adotantes.set(adotanteEntity.id, adotanteEntity);

        console.log(`Adotante criada com sucesso!`); 
        return adotanteEntity;
    }

    async findAll(): Promise<Adotante[]> {
        console.log("Listando todas as adotantes...");
        return Array.from(this.adotantes.values());
    }

    async findById(id: number): Promise<Adotante | null> {
        const adotante = this.adotantes.get(id);
        if (adotante) {
            console.log(`Adotante encontrada: ${adotante.id}`);
            return adotante;
        } else {
            console.log(`Adotante com ID ${id} não encontrada.`);
            return null;
        }
    }

    async update(id: number, adotante: Partial<Adotante>): Promise<Adotante | null> {
        const existingAdotante = this.adotantes.get(id);
        if (existingAdotante) {
            const updatedAdotante = { ...existingAdotante, ...adotante };
            this.adotantes.set(id, updatedAdotante);
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
