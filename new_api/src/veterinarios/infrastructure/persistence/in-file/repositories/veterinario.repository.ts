import { Injectable } from "@nestjs/common";
import { VeterinarioRepository } from "src/veterinarios/application/ports/veterinarios.repository";
import { Veterinario } from "src/veterinarios/domain/veterinarios";


@Injectable()
export class InFileVeterinarioRepository implements VeterinarioRepository {
    async save(veterinario: Veterinario): Promise<Veterinario> {
        throw new Error('Method not implemented.');
    }

    async findAll(): Promise<Veterinario[]> {
        throw new Error('Method not implemented.');
    }

    async findById(id: number): Promise<Veterinario | null> {
        throw new Error('Method not implemented.');
    }

    async update(id: number, veterinario: Partial<Veterinario>): Promise<Veterinario | null> {
        throw new Error('Method not implemented.');
    }

    async remove(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    private readonly veterinario = new Map<String, Veterinario>();
}