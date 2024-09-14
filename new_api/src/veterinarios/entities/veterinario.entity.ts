import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('veterinarios')
export class Veterinario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    especialidade: string;

    @Column({ length: 10 })
    registro_crmv: string;

    @Column()
    pessoa_id: number;
}
