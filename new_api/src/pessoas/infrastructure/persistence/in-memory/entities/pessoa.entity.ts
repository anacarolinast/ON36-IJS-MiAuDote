// import { Adotante } from 'src/adotantes/entities/adotante.entity';
// import { Doador } from 'src/doadores/entities/doador.entity';
import { Veterinario } from 'src/veterinarios/entities/veterinario.entity';
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

    // @OneToOne(() => Veterinario, (veterinario) => veterinario.pessoa)
    // veterinario: Veterinario;

    // @OneToOne(() => Adotante, (adotante) => adotante.pessoa)
    // adotante: Adotante;

    // @OneToOne(() => Doador, (doador) => doador.pessoa)
    // doador: Doador;
}
