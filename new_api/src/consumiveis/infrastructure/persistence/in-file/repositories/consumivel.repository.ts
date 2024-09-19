import { Injectable } from "@nestjs/common";
import { ConsumivelRepository } from "src/consumiveis/application/ports/consumiveis.repository";
import { Consumivel } from "src/consumiveis/domain/consumivel";
import { ConsumivelEntity } from "../entities/consumivel.entity";

@Injectable()
export class InFileConsumivelRepository implements ConsumivelRepository {
    private readonly consumiveis = new Map<number, ConsumivelEntity>();
    private idCounter = 1;

    async save(consumivel: Consumivel): Promise<Consumivel> {
        const consumivelEntity = new ConsumivelEntity();
        consumivelEntity.id = this.idCounter++;
        consumivelEntity.tipo_animal = consumivel.tipo_animal;
        consumivelEntity.descricao = consumivel.descricao;
        consumivelEntity.gasto_id = consumivel.gasto_id;

        this.consumiveis.set(consumivelEntity.id, consumivelEntity);

        console.log(`Consumivel criado com sucesso!`); 
        return consumivelEntity;
    }

    async findAll(): Promise<Consumivel[]> {
        console.log("Listando todas os consumiveis...");
        return Array.from(this.consumiveis.values());
    }

    async findById(id: number): Promise<Consumivel | null> {
        const consumivel = this.consumiveis.get(id);
        if (consumivel) {
            console.log(`Consumivel encontrada: ${consumivel.id}`);
            return consumivel;
        } else {
            console.log(`Consumivel com ID ${id} não encontrado.`);
            return null;
        }
    }

    async update(id: number, consumivel: Partial<Consumivel>): Promise<Consumivel | null> {
        const existingConsumivel = this.consumiveis.get(id);
        if (existingConsumivel) {
            const updatedConsumivel = { ...existingConsumivel, ...consumivel };
            this.consumiveis.set(id, updatedConsumivel);
            console.log(`Consumivel com ID ${id} atualizado com sucesso!`);
            return updatedConsumivel;
        } else {
            console.log(`Consumivel com ID ${id} não encontrado para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.consumiveis.has(id)) {
            this.consumiveis.delete(id);
            console.log(`Consumivel com ID ${id} removido com sucesso!`);
        } else {
            console.log(`Consumivel com ID ${id} não encontrado para remoção.`);
        }
    }
}
