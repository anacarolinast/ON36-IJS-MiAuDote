import { Injectable } from "@nestjs/common";
import { DoadorRepository } from "src/doadores/application/ports/doador.repository";
import { Doador } from "src/doadores/domain/doadores";
import { DoadorEntity } from "../entities/doador.entity";

@Injectable()
export class InFileDoadorRepository implements DoadorRepository {
    private readonly doadores = new Map<number, DoadorEntity>();
    private idCounter = 1;

    async save(doador: Doador): Promise<Doador> {
        const doadorEntity = new DoadorEntity();
        doadorEntity.id = this.idCounter++;
        doadorEntity.tipo_doacao = doador.tipo_doacao;
        doadorEntity.descricao = doador.descricao;
        doadorEntity.pessoa_id = doador.pessoa_id;

        this.doadores.set(doadorEntity.id, doadorEntity);

        console.log(`Doador criada com sucesso!`); 
        return doadorEntity;
    }

    async findAll(): Promise<Doador[]> {
        console.log("Listando todas as doadores...");
        return Array.from(this.doadores.values());
    }

    async findById(id: number): Promise<Doador | null> {
        const doador = this.doadores.get(id);
        if (doador) {
            console.log(`Doador encontrada: ${doador.id}`);
            return doador;
        } else {
            console.log(`Doador com ID ${id} não encontrada.`);
            return null;
        }
    }

    async update(id: number, doador: Partial<Doador>): Promise<Doador | null> {
        const existingDoador = this.doadores.get(id);
        if (existingDoador) {
            const updatedDoador = { ...existingDoador, ...doador };
            this.doadores.set(id, updatedDoador);
            console.log(`Doador com ID ${id} atualizada com sucesso!`);
            return updatedDoador;
        } else {
            console.log(`Doador com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.doadores.has(id)) {
            this.doadores.delete(id);
            console.log(`Doador com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Doador com ID ${id} não encontrada para remoção.`);
        }
    }
}
