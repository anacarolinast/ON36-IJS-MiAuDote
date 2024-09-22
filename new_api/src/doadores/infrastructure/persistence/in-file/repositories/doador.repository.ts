import { Injectable } from "@nestjs/common";
import { DoadorRepository } from "src/doadores/application/ports/doador.repository";
import { Doador } from "src/doadores/domain/doadores";
import { DoadorEntity } from "../entities/doador.entity";
import { DoadorMapper } from "../mappers/doador.mappers";

@Injectable()
export class InFileDoadorRepository implements DoadorRepository {
    private readonly doadores = new Map<number, DoadorEntity>();
    private idCounter = 1;

    async save(doador: Doador): Promise<Doador> {
        const doadorEntity = DoadorMapper.paraPersistencia(doador);
        doadorEntity.id = this.idCounter++;
        this.doadores.set(doadorEntity.id, doadorEntity);
        console.log(`Doador criada com sucesso!`); 
        return DoadorMapper.paraDominio(doadorEntity);
    }

    async findAll(): Promise<Doador[]> {
        console.log("Listando todas as doadores...");
        return Array.from(this.doadores.values()).map(doadoresEntity =>
            DoadorMapper.paraDominio(doadoresEntity)
        );
    }

    async findById(id: number): Promise<Doador | null> {
        const doadorEntity = this.doadores.get(id);
        if (doadorEntity) {
            console.log(`Doador encontrada: ${doadorEntity.id}`);
            return DoadorMapper.paraDominio(doadorEntity);
        } else {
            console.log(`Doador com ID ${id} não encontrada.`);
            return null;
        }
    }

    async update(id: number, doador: Partial<Doador>): Promise<Doador | null> {
        const existingDoadorEntity = this.doadores.get(id);
        if (existingDoadorEntity) {
            const existingDoador = DoadorMapper.paraDominio(existingDoadorEntity);
            
            const updatedDoador = { ...existingDoador, ...doador };
            
            const updatedDoadorEntity = DoadorMapper.paraPersistencia(updatedDoador);
            
            this.doadores.set(id, updatedDoadorEntity);
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
