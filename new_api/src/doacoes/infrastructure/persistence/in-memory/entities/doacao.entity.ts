import { GastoEntity } from 'src/gastos/infrastructure/persistence/in-file/entities/gasto.entity'; 
import { DoadorEntity } from 'src/doadores/infrastructure/persistence/in-file/entities/doador.entity'; 

export class DoacaoEntity {
    id: number;
    doador_id: number;
    data_doacao: Date;
    tipo_doacao: string;
    valor_estimado: number;
    gasto_id: number;
    gastos?: GastoEntity;
    doador?: DoadorEntity;
  }
  
  