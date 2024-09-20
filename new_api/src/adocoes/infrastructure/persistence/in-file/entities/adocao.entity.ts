import { AnimalEntity } from 'src/animais/infrastructure/persistence/in-file/entities/animais.entity'; 
import { AdotanteEntity } from 'src/adotantes/infrastructure/persistence/in-file/entities/adotante.entity'; 

export class AdocaoEntity {
  id: number;
  adotante_id: number;
  animal_id: number;
  data_adocao: Date;
  condicoes_especiais: string;
  status_aprovacao: string;
  animal: AnimalEntity;
  adotante: AdotanteEntity;
}
