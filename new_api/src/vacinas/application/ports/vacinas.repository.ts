import { Injectable } from "@nestjs/common";
import { Vacina } from "src/vacinas/domain/vacinas";

@Injectable()
export abstract class VacinaRepository {
    abstract save(vacina: Vacina): Promise<Vacina>;
    abstract findAll(): Promise<Vacina[]>;
    abstract findById(id: number): Promise<Vacina | null>;
    abstract update(id: number, vacina: Partial<Vacina>): Promise<Vacina | null>;
    abstract remove(id: number): Promise<void>;
}