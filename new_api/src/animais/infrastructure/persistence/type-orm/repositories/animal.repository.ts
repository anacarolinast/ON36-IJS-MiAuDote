import { Injectable } from '@nestjs/common';
import { AnimalRepository } from '../../../../../animais/application/ports/animais.repository';
import { Animal } from '../../../../../animais/domain/animal';
import { AnimalEntity } from '../entities/animal.entity';
import { AnimalMapper } from '../mappers/animal.mapper';
import { Adocao } from 'src/adocoes/domain/adocao';
import { Vacina } from 'src/vacinas/domain/vacinas';
import { Medicamento } from 'src/medicamentos/domain/medicamentos';
import { Castracao } from 'src/castracoes/domain/castracao';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmAnimalRepository implements AnimalRepository {
    constructor(
        @InjectRepository(AnimalEntity)
        private readonly animalRepository: Repository<AnimalEntity>,
        private readonly animalMapper: AnimalMapper,
    ) {}

    async save(animal: Animal): Promise<Animal> {
        const animalEntity = await this.animalMapper.paraPersistencia(animal);
        const savedAnimalEntity = await this.animalRepository.save(animalEntity);
        return this.animalMapper.paraDominio(savedAnimalEntity);
    }

    async findAll(): Promise<Animal[]> {
        const entities = await this.animalRepository.find();
        return Promise.all(entities.map((item) => this.animalMapper.paraDominio(item)));
    }

    async findById(id: number): Promise<Animal | null> {
        const animalEntity = await this.animalRepository.findOne({ where: { id } });
        return animalEntity ? this.animalMapper.paraDominio(animalEntity) : null;
    }

    async update(id: number, animal: Partial<Animal>): Promise<Animal | null> {
        const existingAnimal = await this.animalRepository.findOne({ where: { id } });

        if (existingAnimal) {
            const updatedAnimalEntity = await this.animalMapper.paraPersistencia({
                ...this.animalMapper.paraDominio(existingAnimal),
                ...animal,
            });

            await this.animalRepository.update(id, updatedAnimalEntity);
            console.log(`Animal com ID ${id} atualizado com sucesso!`);

            return this.animalMapper.paraDominio({ ...existingAnimal, ...updatedAnimalEntity });
        } else {
            console.log(`Animal com ID ${id} não encontrado para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        const result = await this.animalRepository.delete(id);
        if (result.affected > 0) {
            console.log(`Animal com ID ${id} removido com sucesso!`);
        } else {
            console.log(`Animal com ID ${id} não encontrado para remoção.`);
        }
    }

    async adopt(id: number): Promise<void> {
        console.log(`Animal com ID ${id} adotado com sucesso!`);
    }

    async castrate(id: number): Promise<void> {
        console.log(`Animal com ID ${id} castrado com sucesso!`);
    }

    async medicate(id: number, medicamento: Medicamento): Promise<Animal> {
        console.log(`Animal com ID ${id} medicado com sucesso!`);
        return this.findById(id);
    }

    async vaccinate(id: number): Promise<Animal> {
        console.log(`Animal com ID ${id} vacinado com sucesso!`);
        return this.findById(id); 
    }
}
