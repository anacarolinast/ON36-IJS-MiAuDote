import { Gasto } from 'src/gastos/entities/gasto.entity';
import { Veterinario } from 'src/veterinarios/entities/veterinario.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    @ManyToOne(() => Veterinario, (veterinario) => veterinario.medicamentos)
    @JoinColumn({ name: 'veterinario_id' })
    veterinario: Veterinario;

    @OneToOne(() => Gasto, (gasto) => gasto.medicamento)
    @JoinColumn({ name: 'gasto_id' })
    gasto: Gasto;
}
