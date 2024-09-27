import { Injectable } from "@nestjs/common";
import { VacinaRepository } from "src/vacinas/application/ports/vacinas.repository";
import { Vacina } from "src/vacinas/domain/vacinas";
import { VacinaEntity } from "../entities/vacina.entity";
import { VacinaMapper } from "../mappers/vacina.mapper";

@Injectable()
export class InFileVacinaRepository implements VacinaRepository {
    private readonly vacinas = new Map<number, VacinaEntity>();
    private idCounter = 1;

    async save(vacina: Vacina): Promise<Vacina> {
        const vacinaEntity = VacinaMapper.paraPersistencia(vacina);
    
        vacinaEntity.id = this.idCounter++;
    
        this.vacinas.set(vacinaEntity.id, vacinaEntity);
    
        console.log(`Vacina criada com sucesso!`);
    
        return VacinaMapper.paraDominio(vacinaEntity);
    }

    async findAll(): Promise<Vacina[]> {
        console.log("Listando todas as vacinas...");
        return Array.from(this.vacinas.values()).map(vacinaEntity =>
            VacinaMapper.paraDominio(vacinaEntity)
        );
    }

    async findById(id: number): Promise<Vacina | null> {
        const vacinaEntity = this.vacinas.get(id);
        if (vacinaEntity) {
            console.log(`Vacina encontrada: ${vacinaEntity.id}`);
            return VacinaMapper.paraDominio(vacinaEntity);
        } else {
            console.log(`Vacina com ID ${id} não encontrado.`);
            return null;
        }
    }

    async update(id: number, dadosAtualizados: Partial<Vacina>): Promise<Vacina | null> {
        const vacinaEntity = this.vacinas.get(id);

        if (vacinaEntity) {
            Object.assign(vacinaEntity, dadosAtualizados);

            this.vacinas.set(id, vacinaEntity);
            console.log(`Vacina com ID ${id} atualizada com sucesso!`);
            
            return VacinaMapper.paraDominio(vacinaEntity);
        } else {
            console.log(`Vacina com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.vacinas.has(id)) {
            this.vacinas.delete(id);
            console.log(`Vacina com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Vacina com ID ${id} não encontrada para remoção.`);
        }
    }
}
