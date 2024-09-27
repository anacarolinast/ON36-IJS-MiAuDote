import { AnimalEntity } from "src/animais/infrastructure/persistence/in-memory/entities/animais.entity";
import { VeterinarioEntity } from "src/veterinarios/infrastructure/persistence/in-memory/entities/veterinario.entity";
import { GastoEntity } from "src/gastos/infrastructure/persistence/in-memory/entities/gasto.entity";

export class VacinaEntity {
    id: number;
    animal_id: number;
    data_vacinacao: Date;
    tipo_vacina: string;
    veterinario_id: number;
    gasto_id: number;
    animais?: AnimalEntity;
    veterinarios?: VeterinarioEntity;
    gastos?: GastoEntity;
}