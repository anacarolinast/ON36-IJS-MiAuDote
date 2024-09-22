import { AdotanteEntity } from 'src/adotantes/infrastructure/persistence/in-memory/entities/adotante.entity';
import { DoadorEntity } from 'src/doadores/infrastructure/persistence/in-memory/entities/doador.entity';
import { VeterinarioEntity } from 'src/veterinarios/infrastructure/persistence/in-memory/entities/veterinario.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pessoas')
export class PessoaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  endereco: string;

  @Column('text')
  telefone: string[];

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  cpf: string;

  @OneToOne(() => VeterinarioEntity, (veterinario) => veterinario.pessoa)
  veterinario: VeterinarioEntity;

  @OneToOne(() => AdotanteEntity, (adotante) => adotante.pessoa)
  adotante: AdotanteEntity;

  @OneToOne(() => DoadorEntity, (doador) => doador.pessoa)
  doador: DoadorEntity;
}
