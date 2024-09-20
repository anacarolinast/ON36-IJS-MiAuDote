import { Injectable } from "@nestjs/common";
import { MedicamentoRepository } from "src/medicamentos/application/ports/medicamento.repository";
import { Medicamento } from "src/medicamentos/domain/medicamentos";
import { MedicamentoEntity } from "../entities/medicamento.entity";

@Injectable()
export class InFileMedicamentoRepository implements MedicamentoRepository {
    private readonly medicamentos = new Map<number, MedicamentoEntity>();
    private idCounter = 1;

    async save(medicamento: Medicamento): Promise<Medicamento> {
        const medicamentoEntity = new MedicamentoEntity();
        medicamentoEntity.id = this.idCounter++;
        medicamentoEntity.animal_id = medicamento.animal_id;
        medicamentoEntity.data_compra = medicamento.data_compra;
        medicamentoEntity.descricao = medicamento.descricao;
        medicamentoEntity.veterinario_id = medicamento.veterinario_id;
        medicamentoEntity.gasto_id = medicamento.gasto_id;

        this.medicamentos.set(medicamentoEntity.id, medicamentoEntity);

        console.log(`Medicamento criado com sucesso!`); 
        return medicamentoEntity;
    }

    async findAll(): Promise<Medicamento[]> {
        console.log("Listando todos as medicamentos...");
        return Array.from(this.medicamentos.values());
    }

    async findById(id: number): Promise<Medicamento | null> {
        const medicamento = this.medicamentos.get(id);
        if (medicamento) {
            console.log(`Medicamento encontrado: ${medicamento.id}`);
            return medicamento;
        } else {
            console.log(`Medicamento com ID ${id} não encontrado.`);
            return null;
        }
    }

    async update(id: number, medicamento: Partial<Medicamento>): Promise<Medicamento | null> {
        const existingMedicamento = this.medicamentos.get(id);
        if (existingMedicamento) {
            const updatedMedicamento = { ...existingMedicamento, ...medicamento };
            this.medicamentos.set(id, updatedMedicamento);
            console.log(`Medicamento com ID ${id} atualizado com sucesso!`);
            return updatedMedicamento;
        } else {
            console.log(`Medicamento com ID ${id} não encontrado para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.medicamentos.has(id)) {
            this.medicamentos.delete(id);
            console.log(`Medicamento com ID ${id} removido com sucesso!`);
        } else {
            console.log(`Medicamento com ID ${id} não encontrado para remoção.`);
        }
    }
}
