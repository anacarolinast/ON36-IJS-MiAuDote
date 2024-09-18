// Ajustar as importações depois do refactor
// import { Medicamento } from 'src/medicamento/entities/medicamento.entity';
// import { Doacao } from 'src/doacoes/entities/doacao.entity';
// import { Vacina } from 'src/vacinas/entities/vacinas.entity';

export class GastoEntity {
    id: number;
    data_gasto: Date;
    tipo: string;
    quantidade: number;
    valor: number;
  
    // Ajustar as importações depois do refactor
    // medicamento?: medicamento[];
    // doacao?: doacao[];
    // vacina?: vacina[];
  }
  
  