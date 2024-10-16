import { CastracaoEntity } from '../../../../../castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { MedicamentoEntity } from '../../../../../medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { PessoaEntity } from '../../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { VacinaEntity } from '../../../../../vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('veterinarios')
export class VeterinarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    especialidade: string;

    @Column({ length: 10 })
    registro_crmv: string;

    @Column()
    pessoa_id: number;

    @OneToOne(() => PessoaEntity, { eager: true })
    @JoinColumn({ name: 'pessoa_id' })
    pessoa: PessoaEntity;

    @OneToMany(() => VacinaEntity, (vacina) => vacina.veterinario)
    vacinas?: VacinaEntity[];

    @OneToMany(() => MedicamentoEntity, (medicamento) => medicamento.veterinario)
    medicamentos?: MedicamentoEntity[];

    @OneToMany(() => CastracaoEntity, (castracao) => castracao.veterinario)
    castracoes?: CastracaoEntity[];
}