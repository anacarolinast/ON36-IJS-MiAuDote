// import { Gasto } from 'src/gastos/entities/gasto.entity';
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

    // @OneToOne(() => Gasto, (gasto) => gasto.consumivel)
    // @JoinColumn({ name: 'gasto_id' })
    // gasto: Gasto;
}
