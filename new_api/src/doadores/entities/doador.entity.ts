import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('doadores')
export class Doador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    tipo_adocao: string;

    @Column()
    pessoa_id: number;

    @OneToOne(() => Pessoa, { eager: true })
    @JoinColumn({ name: 'pessoa_id' })
    pessoa: Pessoa;
    
}
