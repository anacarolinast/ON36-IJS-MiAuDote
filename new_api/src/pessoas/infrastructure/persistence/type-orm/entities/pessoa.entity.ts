import { AdotanteEntity } from '../../../../../adotantes/infrastructure/persistence/type-orm/entities/adotante.entity';
import { DoadorEntity } from '../../../../../doadores/infrastructure/persistence/type-orm/entities/doador.entity';
import { VeterinarioEntity } from '../../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pessoas')
export class PessoaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  cep: string;

  @Column({ length: 255 })
  endereco: string;

  @Column('text')
  telefone: string[];

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  cpf: string;

  @OneToOne(() => VeterinarioEntity, (veterinario) => veterinario.pessoa, {
    cascade: false,
  })
  veterinario?: VeterinarioEntity;

  @OneToOne(() => AdotanteEntity, (adotante) => adotante.pessoa, {
    cascade: false,
  })
  adotante?: AdotanteEntity;

  @OneToOne(() => DoadorEntity, (doador) => doador.pessoa, { cascade: false })
  doador?: DoadorEntity;
}
