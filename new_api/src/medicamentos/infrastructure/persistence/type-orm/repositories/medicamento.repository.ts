import { Injectable } from '@nestjs/common';
import { MedicamentoRepository } from '../../../../../medicamentos/application/ports/medicamento.repository';
import { Medicamento } from '../../../../../medicamentos/domain/medicamentos';
import { MedicamentoEntity } from '../entities/medicamento.entity';
import { MedicamentoMapper } from '../mappers/medicamento.mapper';
import { Gasto } from '../../../../../gastos/domain/gastos';
import { Veterinario } from '../../../../../veterinarios/domain/veterinarios';
import { Animal } from '../../../../../animais/domain/animal';

@Injectable()
export class TypeOrmMedicamentoRepository implements MedicamentoRepository {
    private readonly medicamentos = new Map<number, MedicamentoEntity>();
    constructor(private readonly medicamentoMapper: MedicamentoMapper) {}

    async save(medicamento: Medicamento): Promise<Medicamento> {
        const persistenceModel = await this.medicamentoMapper.paraPersistencia(medicamento);
        this.medicamentos.set(persistenceModel.id, persistenceModel);
        const newEntity = this.medicamentos.get(persistenceModel.id);
        
        return this.medicamentoMapper.paraDominio(newEntity);
    }

    async findAll(): Promise<Medicamento[]> {
        const entities = Array.from(this.medicamentos.values());
        return Promise.all(entities.map((item) => this.medicamentoMapper.paraDominio(item)));
    }

    async findById(id: number): Promise<Medicamento | null> {
        const entities = Array.from(this.medicamentos.values());
        const medicamentoEncontrada = entities.find((item) => item.id === id);
        if (!medicamentoEncontrada) return null;
        return this.medicamentoMapper.paraDominio(medicamentoEncontrada);
    }

    async update(id: number, medicamento: Partial<Medicamento>): Promise<Medicamento | null> {
        const existingMedicamentoEntity = this.medicamentos.get(id);
        if (existingMedicamentoEntity) {
            const existingMedicamento = this.medicamentoMapper.paraDominio(existingMedicamentoEntity);
            
            const updatedMedicamento = {
                ...existingMedicamento,
                ...medicamento,
            };
            const updatedMedicamentoEntity = await this.medicamentoMapper.paraPersistencia(updatedMedicamento);
            
            this.medicamentos.set(id, updatedMedicamentoEntity);
            console.log(`Medicamento com ID ${id} atualizada com sucesso!`);
            return this.medicamentoMapper.paraDominio(updatedMedicamentoEntity);
        } else {
            console.log(`Medicamento com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.medicamentos.has(id)) {
            this.medicamentos.delete(id);
            console.log(`Medicamento com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Medicamento com ID ${id} não encontrada para remoção.`);
        }
    }

}

