import { GastoEntity } from '../../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('consumiveis')
export class ConsumivelEntity {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({ length: 255 })
    tipo_animal: string;  

    @Column({ length: 255 })
    descricao: string; 

    @Column()
    gasto_id: number; 

    @OneToOne(() => GastoEntity, (gasto) => gasto.consumivel)
    @JoinColumn({ name: 'gasto_id' })
    gasto: GastoEntity;
}