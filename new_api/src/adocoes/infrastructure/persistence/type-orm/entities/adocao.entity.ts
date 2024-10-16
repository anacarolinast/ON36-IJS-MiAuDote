import { AdotanteEntity } from '../../../../../adotantes/infrastructure/persistence/type-orm/entities/adotante.entity';
import { AnimalEntity } from '../../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('adocoes')
export class AdocaoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    animal_id: number;

    @Column()
    data_adocao: Date;

    @Column()
    condicoes_especiais: string;

    @Column()
    status_aprovacao: string;

    @ManyToOne(() => AdotanteEntity, (adotante) => adotante.adocoes)
    @JoinColumn({ name: 'adotante_id' })
    adotante: AdotanteEntity;

    @OneToOne(() => AnimalEntity, (animal) => animal.adocao)
    @JoinColumn({ name: 'animal_id' })
    animal: AnimalEntity;
}