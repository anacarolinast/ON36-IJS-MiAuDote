import { Adocao } from "src/adocoes/entities/adocao.entity";
import { Pessoa } from "src/pessoas/entities/pessoa.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Adocao, (adocao) => adocao.adotante)
    @JoinColumn({ name: 'adotante_id' })
    adocoes: Adocao[];
}
