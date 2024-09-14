import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('medicamentos')
export class Medicamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    animal_id: number;

    @Column()
    data_compra: Date;

    @Column({ length: 255 })
    descricao: string;

    @Column()
    veterinario_id: number;

    @Column()
    gasto_id: number;
}
