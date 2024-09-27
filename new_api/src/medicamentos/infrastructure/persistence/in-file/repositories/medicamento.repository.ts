import { Injectable } from "@nestjs/common";
import { MedicamentoRepository } from "src/medicamentos/application/ports/medicamento.repository";
import { Medicamento } from "src/medicamentos/domain/medicamentos";
import { MedicamentoEntity } from "../entities/medicamento.entity";
import { MedicamentoMapper } from "../mappers/medicamento.mapper";
import { Veterinario } from "src/veterinarios/domain/veterinarios";

@Injectable()
export class InFileMedicamentoRepository implements MedicamentoRepository {
    private readonly medicamentos = new Map<number, MedicamentoEntity>();
    private idCounter = 1;

    async save(medicamento: Medicamento): Promise<Medicamento> {
        const medicamentoEntity = new MedicamentoEntity();
        medicamentoEntity.id = this.idCounter++;
        this.medicamentos.set(medicamentoEntity.id, medicamentoEntity);
        console.log(`Medicamento ${medicamentoEntity.id} criado com sucesso!`); 
        return MedicamentoMapper.paraDominio(medicamentoEntity);
    }

    async findAll(): Promise<Medicamento[]> {
        console.log("Listando todos as medicamentos...");
        return Array.from(this.medicamentos.values());
    }

    async findById(id: number): Promise<Medicamento | null> {
        const medicamentoEntity = this.medicamentos.get(id);
        if (medicamentoEntity) {
            console.log(`Medicamento encontrado: ${medicamentoEntity.id}`);
            return MedicamentoMapper.paraDominio(medicamentoEntity);
        } else {
            console.log(`Medicamento com ID ${id} não encontrado.`);
            return null;
        }
    }

    async update(id: number, dadosAtualizados: Partial<Medicamento>): Promise<Medicamento | null> {
        const medicamentoEntity = this.medicamentos.get(id);
        if (medicamentoEntity) {
            Object.assign(medicamentoEntity, dadosAtualizados);

            this.medicamentos.set(id, medicamentoEntity);
            console.log(`Medicamento com ID ${id} atualizado com sucesso!`);
            
            return MedicamentoMapper.paraDominio(medicamentoEntity);
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
