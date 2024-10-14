import { GastoEntity } from 'src/gastos/infrastructure/persistence/type-orm/entities/gasto.entity'; 
import { VeterinarioEntity } from 'src/veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity'; 
import { AnimalEntity } from 'src/animais/infrastructure/persistence/type-orm/entities/animal.entity'; 
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('medicamentos')
export class MedicamentoEntity {
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

    @ManyToOne(() => AnimalEntity, (animal) => animal.medicamentos, { cascade: true })
    @JoinColumn({ name: 'animal_id' })
    animal: AnimalEntity;

    @ManyToOne(() => VeterinarioEntity, (veterinario) => veterinario.medicamentos)
    @JoinColumn({ name: 'veterinario_id' })
    veterinario: VeterinarioEntity;

    @OneToOne(() => GastoEntity, (gasto) => gasto.medicamento)
    @JoinColumn({ name: 'gasto_id' })
    gasto: GastoEntity;
}