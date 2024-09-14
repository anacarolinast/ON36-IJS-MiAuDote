import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('consumiveis')
export class Consumivel {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({ length: 255 })
    tipo_animal: string;  

    @Column({ length: 255 })
    descricao: string; 

    @Column()
    gasto_id: number; 
}
