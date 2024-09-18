// Ajustar as importações depois do refactor
// import { Animal } from 'src/animais/entities/animais.entity';
// import { Veterinario } from 'src/veterinarios/entities/veterinarios.entity';
// import { Gasto } from 'src/gastos/entities/gastos.entity';

export class MedicamentoEntity {
    id: number;
    animal_id: number;
    data_compra: Date;
    descricao: string;
    veterinario_id: number;
    gasto_id: number;
  
    // Ajustar as importações depois do refactor
    // animal?: animal;
    // veterinario?: veterinario;
    // gasto?: gasto;
  }
  
  