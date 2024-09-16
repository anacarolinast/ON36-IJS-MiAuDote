import { Gasto } from 'src/gastos/entities/gasto.entity';
import { Veterinario } from 'src/veterinarios/entities/veterinario.entity';
import { Animal } from 'src/animais/domain/factories/animal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('vacinas')
export class Vacina {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  animal_id: number;

  @Column()
  data_vacinacao: Date;

  @Column({ length: 255 })
  tipo_vacina: string;

  @Column()
  veterinario_id: number;

  @Column()
  gasto_id: number;

  @ManyToOne(() => Animal, (animal) => animal.vacinas)
  @JoinColumn({ name: 'animal_id' })
  animal: Animal;

  @ManyToOne(() => Veterinario, (veterinario) => veterinario.vacinas)
  @JoinColumn({ name: 'veterinario_id' })
  veterinario: Veterinario;

  @OneToOne(() => Gasto, (gasto) => gasto.vacina)
  @JoinColumn({ name: 'gasto_id' })
  gasto: Gasto;
}
