import { GastoEntity } from '../../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { DoadorEntity } from '../../../../../doadores/infrastructure/persistence/type-orm/entities/doador.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('doacoes')
export class DoacaoEntity {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    doador_id: number; 

    @Column()
    data_doacao: Date; 

    @Column({ length: 255 })
    tipo_doacao: string;  

    @Column('decimal', { precision: 10, scale: 2 })
    valor_estimado: number;  

    @Column()
    gasto_id: number;  

    @ManyToOne(() => DoadorEntity, (doador) => doador.doacoes)
    doador: DoadorEntity;

    @OneToOne(() => GastoEntity, (gasto) => gasto.doacao, {cascade: true})
    @JoinColumn({ name: 'gasto_id' })
    gasto: GastoEntity;
}