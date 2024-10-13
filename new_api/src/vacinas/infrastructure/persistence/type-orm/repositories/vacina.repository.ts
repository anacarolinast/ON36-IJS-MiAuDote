import { Injectable } from '@nestjs/common';
import { VacinaRepository } from '../../../../../vacinas/application/ports/vacinas.repository';
import { Vacina } from '../../../../../vacinas/domain/vacinas';
import { VacinaEntity } from '../entities/vacina.entity';
import { VacinaMapper } from '../mappers/vacina.mapper';
import { Animal } from '../../../../../animais/domain/animal';
import { Veterinario } from '../../../../../veterinarios/domain/veterinarios';
import { Gasto } from '../../../../../gastos/domain/gastos';

@Injectable()
export class TypeOrmVacinaRepository implements VacinaRepository {
    private readonly vacinas = new Map<number, VacinaEntity>();
    constructor(private readonly vacinaMapper: VacinaMapper) {}

    async save(vacina: Vacina): Promise<Vacina> {
        const persistenceModel = await this.vacinaMapper.paraPersistencia(vacina);
        this.vacinas.set(persistenceModel.id, persistenceModel);
        const newEntity = this.vacinas.get(persistenceModel.id);
        
        return this.vacinaMapper.paraDominio(newEntity);
    }

    async findAll(): Promise<Vacina[]> {
        const entities = Array.from(this.vacinas.values());
        return Promise.all(entities.map((item) => this.vacinaMapper.paraDominio(item)));
    }

    async findByCpf(cpf: string): Promise<Vacina | null> {
        return null;
    }

    async findById(id: number): Promise<Vacina | null> {
        const entities = Array.from(this.vacinas.values());
        const vacinaEncontrada = entities.find((item) => item.id === id);
        if (!vacinaEncontrada) return null;
        return this.vacinaMapper.paraDominio(vacinaEncontrada);
    }

    async update(id: number, vacina: Partial<Vacina>): Promise<Vacina | null> {
        const existingVacinaEntity = this.vacinas.get(id);
        if (existingVacinaEntity) {
            const existingVacina = this.vacinaMapper.paraDominio(existingVacinaEntity);
            
            const updatedVacina = {
                ...existingVacina,
                ...vacina,
            };
            const updatedVacinaEntity = await this.vacinaMapper.paraPersistencia(updatedVacina);
            
            this.vacinas.set(id, updatedVacinaEntity);
            console.log(`Vacina com ID ${id} atualizada com sucesso!`);
            return this.vacinaMapper.paraDominio(updatedVacinaEntity);
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

    async findByAnimalAndTipoVacina(animalId: number, tipoVacina: string): Promise<Vacina | null> {
        return null;
    }


}

