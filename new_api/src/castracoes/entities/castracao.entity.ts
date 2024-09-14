import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('castracoes')
export class Castracao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    animal_id: number; 

    @Column({ type: 'date' })
    data_castracao: Date; 

    @Column({ length: 255 })
    condicao_pos: string;  

    @Column()
    veterinario_id: number; 

    @Column()
    gasto_id: number; 
}
