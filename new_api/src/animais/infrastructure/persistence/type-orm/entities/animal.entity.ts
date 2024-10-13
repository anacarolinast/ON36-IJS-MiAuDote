import { AdocaoEntity } from '../../../../../adocoes/infrastructure/persistence/type-orm/entities/adocao.entity';
import { MedicamentoEntity } from '../../../../../medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { VacinaEntity } from '../../../../../vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { CastracaoEntity } from '../../../../../castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('animais')
export class AnimalEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    nome: string;

    @Column({ length: 255 })
    especie: string; 

    @Column({ length: 1 })
    sexo: string; 

    @Column({ type: 'date' })
    data_nascimento: Date; 

    @Column({ length: 255 })
    condicao_saude: string; 

    @Column({ length: 255 })
    estado_adocao: string;

    @OneToOne(() => AdocaoEntity, (adocao) => adocao.animal)
    adocao: AdocaoEntity;

    @OneToMany(() => MedicamentoEntity, (medicamento) => medicamento.animal)
    medicamentos: MedicamentoEntity[];

    @OneToMany(() => VacinaEntity, (vacina) => vacina.animal)
    vacinas: VacinaEntity[];

    @OneToOne(() => CastracaoEntity, (castracao) => castracao.animal)
    castracao: CastracaoEntity;
}