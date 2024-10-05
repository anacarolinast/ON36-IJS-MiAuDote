import { Injectable } from "@nestjs/common";
import { ConsumivelRepository } from "src/consumiveis/application/ports/consumiveis.repository";
import { Consumivel } from "src/consumiveis/domain/consumivel";
import { ConsumivelEntity } from "../entities/consumivel.entity";
import { ConsumivelMapper } from "../mappers/consumivel.mapper";
import { Gasto } from "src/gastos/domain/gastos";


@Injectable()
export class InFileConsumivelRepository implements ConsumivelRepository {
    private readonly consumiveis = new Map<number, ConsumivelEntity>();
    private idCounter = 1;

    async save(consumivel: Consumivel): Promise<Consumivel> {
        const consumivelEntity = new ConsumivelEntity();
        consumivelEntity.id = this.idCounter++;
        this.consumiveis.set(consumivelEntity.id, consumivelEntity);
        console.log(`Consumivel criado com sucesso!`); 
        return ConsumivelMapper.paraDominio(consumivelEntity);
    }

    async findAll(): Promise<Consumivel[]> {
        console.log("Listando todos os consumiveis...");
        return Array.from(this.consumiveis.values()).map(consumivelEntity =>
            ConsumivelMapper.paraDominio(consumivelEntity)
        );
    }

    async findById(id: number): Promise<Consumivel | null> {
        const consumivelEntity = this.consumiveis.get(id);
        if (consumivelEntity) {
            console.log(`Consumivel encontrada: ${consumivelEntity.id}`);
            return ConsumivelMapper.paraDominio(consumivelEntity);
        } else {
            console.log(`Consumivel com ID ${id} não encontrado.`);
            return null;
        }
    }

    async update(id: number, dadosAtualizados: Partial<Consumivel>): Promise<Consumivel | null> {
        const consumivelEntity = this.consumiveis.get(id);
        if (consumivelEntity) {
            Object.assign(consumivelEntity, dadosAtualizados);

            this.consumiveis.set(id, consumivelEntity);
            console.log(`Consumivel com ID ${id} atualizado com sucesso!`);
            
            return ConsumivelMapper.paraDominio(consumivelEntity);
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
