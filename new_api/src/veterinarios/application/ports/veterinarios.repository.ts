import { Injectable } from "@nestjs/common";
import { Castracao } from "src/castracoes/domain/castracao";
import { Medicamento } from "src/medicamentos/domain/medicamentos";
import { Vacina } from "src/vacinas/domain/vacinas";
import { Veterinario } from "src/veterinarios/domain/veterinarios";

@Injectable()
export abstract class VeterinarioRepository {
    abstract save(veterinario: Veterinario): Promise<Veterinario>;
    abstract findAll(): Promise<Veterinario[]>;
    abstract findById(id: number): Promise<Veterinario | null>;
    abstract update(id: number, veterinario: Partial<Veterinario>): Promise<Veterinario | null>;
    abstract remove(id: number): Promise<void>;
    abstract vaccinate(id: number, vacina: Vacina): Promise<Veterinario | null>;
    abstract medicate(id: number, medicamento: Medicamento): Promise<Veterinario | null>;
    abstract castrate(id: number, castracao: Castracao): Promise<Veterinario | null>;
}
