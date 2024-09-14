import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gastos')
export class Gasto {
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
}
