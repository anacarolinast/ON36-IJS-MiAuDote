// Ajustar as importações depois do refactor
// import { Animais } from 'src/animais/entities/animais.entity';
// import { Veterinarios } from 'src/veterinarios/entities/veterinarios.entity';
// import { Gastos } from 'src/gastos/entities/gastos.entity';

export class CastracaoEntity {
    id: number;
    animal_id: number;
    data_castracao: Date;
    condicao_pos: string;
    veterinario_id: number;
    gasto_id: number;
  
    // Ajustar as importações depois do refactor
    // animais?: Animais;
    // veterinarios?: Veterinarios;
    // gastos?: Gastos;
  }
  