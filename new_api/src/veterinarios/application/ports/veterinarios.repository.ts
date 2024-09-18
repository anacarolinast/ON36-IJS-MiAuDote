import { Injectable } from "@nestjs/common";
import { Veterinario } from "src/veterinarios/domain/veterinarios";

@Injectable()
export abstract class VeterinarioRepository {
    abstract save(veterinario: Veterinario): Promise<Veterinario>;
    abstract findAll(): Promise<Veterinario[]>;
    abstract findById(id: number): Promise<Veterinario | null>;
    abstract update(id: number, veterinario: Partial<Veterinario>): Promise<Veterinario | null>;
    abstract remove(id: number): Promise<void>;
}
