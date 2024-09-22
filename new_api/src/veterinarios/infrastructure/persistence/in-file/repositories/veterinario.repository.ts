import { Injectable } from "@nestjs/common";
import { VeterinarioRepository } from "src/veterinarios/application/ports/veterinarios.repository";
import { Veterinario } from "src/veterinarios/domain/veterinarios";
import { VeterinarioEntity } from "../entities/veterinario.entity";
import { VeterinarioMapper } from "../mappers/veterinario.mapper";

@Injectable()
export class InFileVeterinarioRepository implements VeterinarioRepository {
    private readonly veterinarios = new Map<number, VeterinarioEntity>();
    private idCounter = 1;

    async save(veterinario: Veterinario): Promise<Veterinario> {
        const veterinarioEntity = VeterinarioMapper.paraPersistencia(veterinario);
        veterinarioEntity.id = this.idCounter++;
        this.veterinarios.set(veterinarioEntity.id, veterinarioEntity);
        console.log(`Veterinario ${veterinarioEntity.id} criado com sucesso!`); 
        return  VeterinarioMapper.paraDominio(veterinarioEntity);
    }

    async findAll(): Promise<Veterinario[]> {
        console.log("Listando todos os veterinarios...");
        return Array.from(this.veterinarios.values()).map(veterinarioEntity =>
            VeterinarioMapper.paraDominio(veterinarioEntity)
        );
    }

    async findById(id: number): Promise<Veterinario | null> {
        const veterinarioEntity = this.veterinarios.get(id);
        if (veterinarioEntity) {
            console.log(`Veterinario encontrado: ${veterinarioEntity.id}`);
            return VeterinarioMapper.paraDominio(veterinarioEntity);
        } else {
            console.log(`Veterinario com ID ${id} não encontrada.`);
            return null;
        }
    }

    async update(id: number, veterinario: Partial<Veterinario>): Promise<Veterinario | null> {
        const existingVeterinarioEntity = this.veterinarios.get(id);
        if (existingVeterinarioEntity) {
            const existingVeterinario = VeterinarioMapper.paraDominio(existingVeterinarioEntity);
            
            const updatedVeterinario = { 
                ...existingVeterinarioEntity, 
                ...veterinario
            };

            const updatedAdotanteEntity = VeterinarioMapper.paraPersistencia(updatedVeterinario);

            this.veterinarios.set(id, updatedVeterinario);
            console.log(`Veterinario com ID ${id} atualizado com sucesso!`);
            return updatedVeterinario;
        } else {
            console.log(`Veterinario com ID ${id} não encontrado para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.veterinarios.has(id)) {
            this.veterinarios.delete(id);
            console.log(`Veterinario com ID ${id} removido com sucesso!`);
        } else {
            console.log(`Veterinario com ID ${id} não encontrado para remoção.`);
        }
    }
}
