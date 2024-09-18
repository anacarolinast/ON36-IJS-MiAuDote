// Ajustar as importações depois do refactor
// import { Gastos } from 'src/gastos/entities/gastos.entity';
// import { Doador } from 'src/doador/entities/doador.entity';

export class DoacaoEntity {
    id: number;
    doador_id: number;
    data_doacao: Date;
    tipo_doacao: string;
    valor_estimado: number;
    gasto_id: number;
  
    // Ajustar as importações depois do refactor
    // gastos?: Gastos;
    // doador?: doador;
  }
  
  