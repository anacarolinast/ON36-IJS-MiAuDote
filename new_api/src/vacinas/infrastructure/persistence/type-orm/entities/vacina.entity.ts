import { GastoEntity } from '../../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { VeterinarioEntity } from '../../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { AnimalEntity } from '../../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vacinas')
export class VacinaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    animal_id: number;

    @Column()
    data_vacinacao: Date;

    @Column({ length: 255 })
    tipo_vacina: string;

    @Column()
    veterinario_id: number;

    @Column()
    gasto_id: number;

    @ManyToOne(() => AnimalEntity, (animal) => animal.vacinas)
    @JoinColumn({ name: 'animal_id' })
    animal: AnimalEntity;

    @ManyToOne(() => VeterinarioEntity, (veterinario) => veterinario.vacinas)
    @JoinColumn({ name: 'veterinario_id' })
    veterinario: VeterinarioEntity;

    @OneToOne(() => GastoEntity, (gasto) => gasto.vacina, { cascade: true })
    @JoinColumn({ name: 'gasto_id' })
    gasto: GastoEntity;
}