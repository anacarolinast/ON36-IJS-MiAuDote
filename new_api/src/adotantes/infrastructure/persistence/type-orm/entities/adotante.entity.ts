import { AdocaoEntity } from '../../../../../adocoes/infrastructure/persistence/type-orm/entities/adocao.entity';
import { PessoaEntity } from '../../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity'; 
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('adotante')
export class AdotanteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    renda: number;

    @Column()
    condicao_entrevista: string;

    @Column()
    pessoa_id: number;

    @OneToOne(() => PessoaEntity, { eager: true })
    @JoinColumn({ name: 'pessoa_id' })
    pessoa: PessoaEntity;

    @OneToMany(() => AdocaoEntity, (adocao) => adocao.adotante)
    adocoes: AdocaoEntity[];
}