import { BadRequestException, Injectable } from "@nestjs/common";
import { AnimalRepository } from "src/animais/application/ports/animais.repository";
import { Animal } from "src/animais/domain/animal";
import { AnimalEntity } from "../entities/animais.entity";
import { AnimalMapper } from "../mappers/animais.mapper";
import { Vacina } from "src/vacinas/domain/vacinas";

@Injectable()
export class InFileAnimalRepository implements AnimalRepository {
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
        console.log("Listando todos os animais...");
        return Array.from(this.animais.values()).map(AnimalMapper.paraDominio);
    }

    async findById(id: number): Promise<Animal | null> {
        const animalEntity = this.animais.get(id);
        if (animalEntity) {
            console.log(`Animal encontrado: ${animalEntity.nome}`);
            return AnimalMapper.paraDominio(animalEntity);
        } else {
            console.log(`Animal com ID ${id} não encontrado.`);
            return null;
        }
    }

    async update(id: number, animal: Partial<Animal>): Promise<Animal | null> {
        const existingAnimalEntity = this.animais.get(id);
        if (existingAnimalEntity) {
            const existingAnimal = AnimalMapper.paraDominio(existingAnimalEntity);
            const updatedAnimal: Animal = {
                ...existingAnimal,
                ...animal,
                adocao: animal.adocao !== undefined ? animal.adocao : existingAnimal.adocao,
            };

            const updatedAnimalEntity = AnimalMapper.paraPersistencia(updatedAnimal);
            this.animais.set(id, updatedAnimalEntity);
            console.log(`Animal com ID ${id} atualizado com sucesso!`);
            return AnimalMapper.paraDominio(updatedAnimalEntity);
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

    async adopt(animalId: number, adocaoData: any): Promise<void> {
        const existingAnimalEntity = this.animais.get(animalId);
        if (existingAnimalEntity) {
            if (existingAnimalEntity.estado_adocao === 'Adotado') {
                throw new BadRequestException(`O animal com ID ${animalId} já foi adotado.`);
            }
            existingAnimalEntity.estado_adocao = 'Adotado';
            existingAnimalEntity.adocao = adocaoData;

            this.animais.set(animalId, existingAnimalEntity);
            console.log(`Animal com ID ${animalId} adotado com sucesso!`);
        } else {
            console.log(`Animal com ID ${animalId} não encontrado para adoção.`);
            throw new BadRequestException(`Animal com ID ${animalId} não encontrado.`);
        }
    }

    async vaccinate(animalId: number, vacina: Vacina): Promise<Animal | null> {
        const existingAnimalEntity = this.animais.get(animalId);
        if (existingAnimalEntity) {
            const existingAnimal = AnimalMapper.paraDominio(existingAnimalEntity);

            existingAnimal.vacinas.push(vacina);
            const updatedAnimalEntity = AnimalMapper.paraPersistencia(existingAnimal);
            this.animais.set(animalId, updatedAnimalEntity);
            console.log(`Animal com ID ${animalId} vacinado com sucesso!`);
            return AnimalMapper.paraDominio(updatedAnimalEntity);
        } else {
            console.log(`Animal com ID ${animalId} não encontrado para vacinação.`);
            throw new BadRequestException(`Animal com ID ${animalId} não encontrado.`);
        }
    }

    async medicate(animalId: number, medicamento: any): Promise<Animal | null> {
        const existingAnimalEntity = this.animais.get(animalId);
        if (existingAnimalEntity) {
            const existingAnimal = AnimalMapper.paraDominio(existingAnimalEntity);

            existingAnimal.medicamentos.push(medicamento);
            const updatedAnimalEntity = AnimalMapper.paraPersistencia(existingAnimal);
            this.animais.set(animalId, updatedAnimalEntity);
            console.log(`Animal com ID ${animalId} medicado com sucesso!`);
            return AnimalMapper.paraDominio(updatedAnimalEntity);
        } else {
            console.log(`Animal com ID ${animalId} não encontrado para medicação.`);
            throw new BadRequestException(`Animal com ID ${animalId} não encontrado.`);
        }
    }

    async castrate(animalId: number, castracaoData: any): Promise<void> {
        const existingAnimalEntity = this.animais.get(animalId);
        if (existingAnimalEntity) {
            if (existingAnimalEntity.castracao) {
                throw new BadRequestException(`O animal com ID ${animalId} já foi castrado.`);
            }

            existingAnimalEntity.castracao = castracaoData;
            this.animais.set(animalId, existingAnimalEntity);
            console.log(`Animal com ID ${animalId} castrado com sucesso!`);
        } else {
            console.log(`Animal com ID ${animalId} não encontrado para castração.`);
            throw new BadRequestException(`Animal com ID ${animalId} não encontrado.`);
        }
    }
}
