import { DoacaoEntity } from '../../../../../doacoes/infrastructure/persistence/type-orm/entities/doacao.entity';
import { PessoaEntity } from '../../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
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

    @OneToOne(() => PessoaEntity, { eager: true, cascade: true })
    @JoinColumn({ name: 'pessoa_id' })
    pessoa: PessoaEntity;

    @OneToMany(() => DoacaoEntity, (doacao) => doacao.doador)
    doacoes?: DoacaoEntity[];
}