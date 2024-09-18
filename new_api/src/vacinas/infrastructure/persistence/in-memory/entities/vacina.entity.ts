import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('vacinas')
export class VacinaEntity {
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

  // @ManyToOne(() => Animal, (animal) => animal.vacinas)
  // @JoinColumn({ name: 'animal_id' })
  // animal: Animal;

  // @ManyToOne(() => Veterinario, (veterinario) => veterinario.vacinas)
  // @JoinColumn({ name: 'veterinario_id' })
  // veterinario: Veterinario;

  // @OneToOne(() => Gasto, (gasto) => gasto.vacina)
  // @JoinColumn({ name: 'gasto_id' })
  // gasto: Gasto;
}
