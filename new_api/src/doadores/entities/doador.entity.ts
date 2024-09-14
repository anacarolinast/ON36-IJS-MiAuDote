import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('doadores')
export class Doador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    tipo_adocao: string;

    @Column()
    pessoa_id: number;
}
