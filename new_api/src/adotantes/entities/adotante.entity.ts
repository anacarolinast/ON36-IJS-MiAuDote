import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("adotante")
export class Adotante {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    renda: number;

    @Column()
    condicao_entrevista: string;

    @Column()
    pessoa_id: number;

    @OneToOne(() => Pessoa, { eager: true })
    @JoinColumn({ name: 'pessoa_id' })
    pessoa: Pessoa;
}
