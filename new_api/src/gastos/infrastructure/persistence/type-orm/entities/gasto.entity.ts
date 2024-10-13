import { ConsumivelEntity } from '../../../../../consumiveis/infrastructure/persistence/type-orm/entities/consumivel.entity';
import { DoacaoEntity } from '../../../../../doacoes/infrastructure/persistence/type-orm/entities/doacao.entity';
import { CastracaoEntity } from '../../../../../castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { VacinaEntity } from '../../../../../vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { MedicamentoEntity } from '../../../../../medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gastos')
export class GastoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data_gasto: Date;

    @Column({ length: 255 })
    tipo: string;

    @Column('int')
    quantidade: number;

    @Column('decimal', { precision: 10, scale: 2 }) 
    valor: number;

    @OneToOne(() => ConsumivelEntity, (consumivel) => consumivel.gasto)
    consumivel: ConsumivelEntity;

    @OneToOne(() => DoacaoEntity, (doacao) => doacao.gasto)
    doacao: DoacaoEntity;

    @OneToOne(() => CastracaoEntity, (castracao) => castracao.gasto)
    castracao: CastracaoEntity;

    @OneToOne(() => VacinaEntity, (vacina) => vacina.gasto)
    vacina: VacinaEntity;

    @OneToOne(() => MedicamentoEntity, (medicamento) => medicamento.gasto)
    medicamento: MedicamentoEntity;
}