import { Injectable } from "@nestjs/common";
import { VacinaRepository } from "src/vacinas/application/ports/vacinas.repository";
import { Vacina } from "src/vacinas/domain/vacinas";
import { VacinaEntity } from "../entities/vacina.entity";

@Injectable()
export class InFileVacinaRepository implements VacinaRepository {
    private readonly vacinas = new Map<number, VacinaEntity>();
    private idCounter = 1;

    async save(vacina: Vacina): Promise<Vacina> {
        const vacinaEntity = new VacinaEntity();
        vacinaEntity.id = this.idCounter++;
        vacinaEntity.animal_id = vacina.animal_id;
        vacinaEntity.data_vacinacao = vacina.data_vacinacao;
        vacinaEntity.tipo_vacina = vacina.tipo_vacina;
        vacinaEntity.veterinario_id = vacina.veterinario_id;
        vacinaEntity.gasto_id = vacina.gasto_id;

        this.vacinas.set(vacinaEntity.id, vacinaEntity);

        console.log(`Vacina criada com sucesso!`); 
        return vacinaEntity;
    }

    async findAll(): Promise<Vacina[]> {
        console.log("Listando todas as vacinas...");
        return Array.from(this.vacinas.values());
    }

    async findById(id: number): Promise<Vacina | null> {
        const vacina = this.vacinas.get(id);
        if (vacina) {
            console.log(`Vacina encontrada: ${vacina.id}`);
            return vacina;
        } else {
            console.log(`Vacina com ID ${id} não encontrado.`);
            return null;
        }
    }

    async update(id: number, vacina: Partial<Vacina>): Promise<Vacina | null> {
        const existingVacina = this.vacinas.get(id);
        if (existingVacina) {
            const updatedVacina = { ...existingVacina, ...vacina };
            this.vacinas.set(id, updatedVacina);
            console.log(`Vacina com ID ${id} atualizada com sucesso!`);
            return updatedVacina;
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
