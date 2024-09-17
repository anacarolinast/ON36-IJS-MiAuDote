// import { Adotante } from 'src/adotantes/entities/adotante.entity';
// import { Animal } from 'src/animais/domain/factories/animal.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity('adocoes')
export class AdocaoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adotante_id: number;

  @Column()
  animal_id: number;

  @Column()
  data_adocao: Date;

  @Column()
  condicoes_especiais: string;

  @Column()
  status_aprovacao: string;

  // @ManyToOne(() => Adotante, (adotante) => adotante.adocoes)
  // adotante: Adotante;

  // @OneToOne(() => Animal, (animal) => animal.adocao)
  // @JoinColumn({ name: 'animal_id' })
  // animal: Animal;
}
