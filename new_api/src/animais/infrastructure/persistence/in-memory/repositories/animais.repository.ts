import { Injectable } from "@nestjs/common";
import { AnimalRepository } from "src/animais/application/ports/animais.repository";
import { Animal } from "src/animais/domain/animal";
import { AnimalEntity } from "../entities/animais.entity";
import { AnimalMapper } from "../mappers/animais.mapper";

@Injectable()
export class InMemoryAnimalRepository implements AnimalRepository {
    private readonly animais = new Map<number, AnimalEntity>();
    private idCounter = 1;

    async save(animal: Animal): Promise<Animal> {
        const animalEntity = AnimalMapper.paraPersistencia(animal);
        animalEntity.id = this.idCounter++;
        this.animais.set(animalEntity.id, animalEntity);
        console.log(`Animal ${animalEntity.id} criado com sucesso!`);
        return AnimalMapper.paraDominio(animalEntity);
    }

    async findAll(): Promise<Animal[]> {
        console.log("Listando todos as animais...");
        return Array.from(this.animais.values());
    }

    async findById(id: number): Promise<Animal | null> {
        const animal = this.animais.get(id);
        if (animal) {
            console.log(`Animal encontrado: ${animal.nome}`);
            return animal;
        } else {
            console.log(`Animal com ID ${id} não encontrado.`);
            return null;
        }
    }

    async update(id: number, animal: Partial<Animal>): Promise<Animal | null> {
        const existingAnimal = this.animais.get(id);
        if (existingAnimal) {
            const updatedAnimal = { ...existingAnimal, ...animal };
            this.animais.set(id, updatedAnimal);
            console.log(`Animal com ID ${id} atualizado com sucesso!`);
            return updatedAnimal;
        } else {
            console.log(`Animal com ID ${id} não encontrado para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.animais.has(id)) {
            this.animais.delete(id);
            console.log(`Animal com ID ${id} removido com sucesso!`);
        } else {
            console.log(`Animal com ID ${id} não encontrado para remoção.`);
        }
    }
}
