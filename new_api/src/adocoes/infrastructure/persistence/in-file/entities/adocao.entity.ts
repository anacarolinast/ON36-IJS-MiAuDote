// Ajustar as importações depois do refactor
// import { Animais } from 'src/animais/entities/animais.entity';
// import { Adotantes } from 'src/adotantes/entities/adotantes.entity';


export class AdocaoEntity {
  id: number;
  adotante_id: number;
  animal_id: number;
  data_adocao: Date;
  condicoes_especiais: string;
  status_aprovacao: string;

  // Ajustar as importações depois do refactor
  // animais?: Animais[];
  // adotantes?: Adotantes;
}
