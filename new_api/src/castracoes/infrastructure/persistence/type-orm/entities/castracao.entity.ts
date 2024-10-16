import { GastoEntity } from '../../../../../gastos/infrastructure/persistence/type-orm/entities//gasto.entity';
import { VeterinarioEntity } from '../../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { AnimalEntity } from 'src/animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('castracoes')
export class CastracaoEntity {
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

    @ManyToOne(() => AnimalEntity, (animal) => animal.castracao)
    @JoinColumn({ name: 'animal_id' })
    animal: AnimalEntity;

    @ManyToOne(() => VeterinarioEntity, (veterinario) => veterinario.castracoes)
    @JoinColumn({ name: 'veterinario_id' })
    veterinario: VeterinarioEntity;

    @OneToOne(() => GastoEntity, (gasto) => gasto.castracao, {cascade: true})
    @JoinColumn({ name: 'gasto_id' })
    gasto: GastoEntity;
}