import { Injectable } from '@nestjs/common';
import { VeterinarioRepository } from '../../../../../veterinarios/application/ports/veterinarios.repository';
import { Veterinario } from '../../../../../veterinarios/domain/veterinarios';
import { VeterinarioEntity } from '../entities/veterinario.entity';
import { VeterinarioMapper } from '../mappers/veterinario.mapper';
import { Pessoa } from '../../../../../pessoas/domain/pessoas';
import { Castracao } from '../../../../../castracoes/domain/castracao';
import { Vacina } from '../../../../../vacinas/domain/vacinas';
import { Medicamento } from '../../../../../medicamentos/domain/medicamentos';

@Injectable()
export class TypeOrmVeterinarioRepository implements VeterinarioRepository {
    private readonly veterinarios = new Map<number, VeterinarioEntity>();
    constructor(private readonly veterinarioMapper: VeterinarioMapper) {}

    async save(veterinario: Veterinario): Promise<Veterinario> {
        const persistenceModel = await this.veterinarioMapper.paraPersistencia(veterinario);
        this.veterinarios.set(persistenceModel.id, persistenceModel);
        const newEntity = this.veterinarios.get(persistenceModel.id);
        
        return this.veterinarioMapper.paraDominio(newEntity);
    }

    async findAll(): Promise<Veterinario[]> {
        const entities = Array.from(this.veterinarios.values());
        return Promise.all(entities.map((item) => this.veterinarioMapper.paraDominio(item)));
    }

    async findByCpf(cpf: string): Promise<Veterinario | null> {
        return null;
    }

    async findById(id: number): Promise<Veterinario | null> {
        const entities = Array.from(this.veterinarios.values());
        const veterinarioEncontrada = entities.find((item) => item.id === id);
        if (!veterinarioEncontrada) return null;
        return this.veterinarioMapper.paraDominio(veterinarioEncontrada);
    }

    async update(id: number, veterinario: Partial<Veterinario>): Promise<Veterinario | null> {
        const existingVeterinarioEntity = this.veterinarios.get(id);
        if (existingVeterinarioEntity) {
            const existingVeterinario = this.veterinarioMapper.paraDominio(existingVeterinarioEntity);
            
            const updatedVeterinario = {
                ...existingVeterinario,
                ...veterinario,
            };
            const updatedVeterinarioEntity = await this.veterinarioMapper.paraPersistencia(updatedVeterinario);
            
            this.veterinarios.set(id, updatedVeterinarioEntity);
            console.log(`Veterinario com ID ${id} atualizada com sucesso!`);
            return this.veterinarioMapper.paraDominio(updatedVeterinarioEntity);
        } else {
            console.log(`Veterinario com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.veterinarios.has(id)) {
            this.veterinarios.delete(id);
            console.log(`Veterinario com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Veterinario com ID ${id} não encontrada para remoção.`);
        }
    }

    async findByAnimalAndTipoVeterinario(animalId: number, tipoVeterinario: string): Promise<Veterinario | null> {
        return null;
    }

    async vaccinate(id: number, vacina: Vacina): Promise<Veterinario | null>{
        return null;
    }
    async medicate(id: number, medicamento: Medicamento): Promise<Veterinario | null>{
        return null;
    }
    async castrate(id: number, castracao: Castracao): Promise<Veterinario | null>{
        return null;
    }


}

