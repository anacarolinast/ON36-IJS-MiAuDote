import { AnimalEntity } from "src/animais/infrastructure/persistence/in-file/entities/animais.entity";
import { VeterinarioEntity } from "src/veterinarios/infrastructure/persistence/in-file/entities/veterinario.entity";
import { GastoEntity } from "src/gastos/infrastructure/persistence/in-file/entities/gasto.entity";

export class CastracaoEntity {
    id: number;
    animal_id: number;
    data_castracao: Date;
    condicao_pos: string;
    veterinario_id: number;
    gasto_id: number;
    animais?: AnimalEntity;
    veterinarios?: VeterinarioEntity;
    gastos?: GastoEntity;
  }
  