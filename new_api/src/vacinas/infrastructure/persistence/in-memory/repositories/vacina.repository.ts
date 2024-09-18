import { Injectable } from "@nestjs/common";
import { VacinaRepository } from "src/vacinas/application/ports/vacinas.repository";
import { Vacina } from "src/vacinas/domain/vacinas";
import { VacinaEntity } from "../entities/vacina.entity";

Injectable()
export class InMemoryVacinaRepository implements VacinaRepository {
    async save(vacina: Vacina): Promise<Vacina> {
        throw new Error('Method not implemented.');
    }

    async findAll(): Promise<Vacina[]> {
        throw new Error('Method not implemented.');
    }

    async findById(id: number): Promise<Vacina | null> {
        throw new Error('Method not implemented.');
    }

    async update(id: number, vacina: Partial<Vacina>): Promise<Vacina | null> {
        throw new Error('Method not implemented.');
    }

    async remove(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    private readonly vacina = new Map<String, VacinaEntity>();
}