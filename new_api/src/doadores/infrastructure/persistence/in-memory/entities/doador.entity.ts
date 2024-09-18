// import { Doacao } from 'src/doacoes/entities/doacao.entity';
// import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('doadores')
export class DoadorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    tipo_doacao: string;

    @Column({ length: 255 })
    descricao: string;

    @Column()
    pessoa_id: number;

    // @OneToOne(() => Pessoa, { eager: true })
    // @JoinColumn({ name: 'pessoa_id' })
    // pessoa: Pessoa;

    // @OneToMany(() => Doacao, (doacao) => doacao.doador)
    // doacoes: Doacao[];
}
