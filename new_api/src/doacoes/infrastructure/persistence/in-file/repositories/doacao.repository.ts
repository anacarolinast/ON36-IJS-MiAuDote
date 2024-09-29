import { Injectable } from "@nestjs/common";
import { DoacaoRepository } from "src/doacoes/application/ports/doacao.repository";
import { Doacao } from "src/doacoes/domain/doacoes";
import { DoacaoEntity } from "../entities/doacao.entity";
import { DoacaoMapper } from "../mappers/doacao.mappers";

@Injectable()
export class InFileDoacaoRepository implements DoacaoRepository {
    private readonly doacoes = new Map<number, DoacaoEntity>();
    private idCounter = 1;

    async save(doacao: Doacao): Promise<Doacao> {
        const doacaoEntity = DoacaoMapper.paraPersistencia(doacao);
        doacaoEntity.id = this.idCounter++;
        this.doacoes.set(doacaoEntity.id, doacaoEntity);

        console.log(`Doacao criada com sucesso!`); 
        return DoacaoMapper.paraDominio(doacaoEntity);
    }

    async findAll(): Promise<Doacao[]> {
        console.log("Listando todas as doacoes...");
        return Array.from(this.doacoes.values()).map(DoacaoMapper.paraDominio);
    }

    async findById(id: number): Promise<Doacao | null> {
        const doacaoEntity = this.doacoes.get(id);
        if (doacaoEntity) {
            console.log(`Doacao encontrada: ${doacaoEntity.id}`);
            return DoacaoMapper.paraDominio(doacaoEntity);
        } else {
            console.log(`Doacao com ID ${id} não encontrada.`);
            return null;
        }
    }

    async update(id: number, doacao: Partial<Doacao>): Promise<Doacao | null> {
        const existingDoacaoEntity = this.doacoes.get(id);
        if (existingDoacaoEntity) {
            const updatedDoacaoEntity = { ...existingDoacaoEntity, ...DoacaoMapper.paraPersistencia(doacao as Doacao) };
            this.doacoes.set(id, updatedDoacaoEntity);
            console.log(`Doacao com ID ${id} atualizada com sucesso!`);
            return DoacaoMapper.paraDominio(updatedDoacaoEntity);
        } else {
            console.log(`Doacao com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.doacoes.has(id)) {
            this.doacoes.delete(id);
            console.log(`Doacao com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Doacao com ID ${id} não encontrada para remoção.`);
        }
    }
}
