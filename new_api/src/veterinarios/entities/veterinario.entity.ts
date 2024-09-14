import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    @OneToOne(() => Pessoa, { eager: true }) 
    @JoinColumn({ name: 'pessoa_id' })
    pessoa: Pessoa;
    
}
