import { Injectable } from '@nestjs/common';
import { AnimalRepository } from '../../../../../animais/application/ports/animais.repository';
import { Animal } from '../../../../../animais/domain/animal';
import { AnimalEntity } from '../entities/animal.entity';
import { AnimalMapper } from '../mappers/animal.mapper';
import { Adocao } from 'src/adocoes/domain/adocao';
import { Vacina } from 'src/vacinas/domain/vacinas';
import { Medicamento } from 'src/medicamentos/domain/medicamentos';
import { Castracao } from 'src/castracoes/domain/castracao';

@Injectable()
export class TypeOrmAnimalRepository implements AnimalRepository {
    private readonly animais = new Map<number, AnimalEntity>();
    constructor(private readonly animalMapper: AnimalMapper) {}

    async save(animal: Animal): Promise<Animal> {
        const persistenceModel = await this.animalMapper.paraPersistencia(animal);
        this.animais.set(persistenceModel.id, persistenceModel);
        const newEntity = this.animais.get(persistenceModel.id);
        
        return this.animalMapper.paraDominio(newEntity);
    }

    async findAll(): Promise<Animal[]> {
        const entities = Array.from(this.animais.values());
        return Promise.all(entities.map((item) => this.animalMapper.paraDominio(item)));
    }

    async findById(id: number): Promise<Animal | null> {
        const entities = Array.from(this.animais.values());
        const animalEncontrada = entities.find((item) => item.id === id);
        if (!animalEncontrada) return null;
        return this.animalMapper.paraDominio(animalEncontrada);
    }

    async update(id: number, animal: Partial<Animal>): Promise<Animal | null> {
        const existingAnimalEntity = this.animais.get(id);
        if (existingAnimalEntity) {
            const existingAnimal = this.animalMapper.paraDominio(existingAnimalEntity);
            
            const updatedAnimal = {
                ...existingAnimal,
                ...animal,
            };
            const updatedAnimalEntity = await this.animalMapper.paraPersistencia(updatedAnimal);
            
            this.animais.set(id, updatedAnimalEntity);
            console.log(`Animal com ID ${id} atualizada com sucesso!`);
            return this.animalMapper.paraDominio(updatedAnimalEntity);
        } else {
            console.log(`Animal com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.animais.has(id)) {
            this.animais.delete(id);
            console.log(`Animal com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Animal com ID ${id} não encontrada para remoção.`);
        }
    }

    async adopt(animalId: number, adocao: Adocao): Promise<void> {
        // Apenas imprime uma mensagem de log e retorna null -- IMPLEMENTAR
        console.log(`Tentativa de adoção para o animal com ID ${animalId}.`);
        return null; // Retorna nulo
    }

    async vaccinate(vacinaId: number, vacina: Vacina): Promise<Animal | null> {
        // Apenas imprime uma mensagem de log e retorna null -- IMPLEMENTAR
        console.log(`Tentativa de vacinação para o animal com ID ${vacinaId}.`);
        return null; // Retorna nulo
    }

    async medicate(medicamentoId: number, medicamento: Medicamento): Promise<Animal | null> {
        // Apenas imprime uma mensagem de log e retorna null -- IMPLEMENTAR
        console.log(`Tentativa de medicação para o animal com ID ${medicamentoId}.`);
        return null; // Retorna nulo
    }

    async castrate(castracaoId: number, castracao: Castracao): Promise<void> {
        // Apenas imprime uma mensagem de log e retorna null -- IMPLEMENTAR
        console.log(`Tentativa de castração para o animal com ID ${castracaoId}.`);
        return null; // Retorna nulo
    }
}

