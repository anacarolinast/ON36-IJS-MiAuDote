import { Doador } from 'src/doadores/entities/doador.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('doacoes')
export class Doacao {
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

    @ManyToOne(() => Doador, (doador) => doador.doacoes)
    doador: Doador;
}
