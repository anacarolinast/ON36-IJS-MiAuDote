import { Gasto } from 'src/gastos/entities/gasto.entity';
import { Veterinario } from 'src/veterinarios/entities/veterinario.entity';
import { Animal } from 'src/animais/entities/animal.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    @ManyToOne(() => Animal, (animal) => animal.castracao)
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @ManyToOne(() => Veterinario, (veterinario) => veterinario.castracoes)
    @JoinColumn({ name: 'veterinario_id' })
    veterinario: Veterinario;

    @OneToOne(() => Gasto, (gasto) => gasto.castracao)
    @JoinColumn({ name: 'gasto_id' })
    gasto: Gasto;
}
