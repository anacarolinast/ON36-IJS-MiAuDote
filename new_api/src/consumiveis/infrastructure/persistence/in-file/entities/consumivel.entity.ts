import { GastoEntity } from "src/gastos/infrastructure/persistence/in-file/entities/gasto.entity";

export class ConsumivelEntity {
    id: number;
    tipo_animal: string;
    descricao: string;
    gasto_id: number;
    gastos?: GastoEntity;
  }
  
  