// import { Castracao } from 'src/castracoes/entities/castracao.entity';
// import { Medicamento } from 'src/medicamentos/entities/medicamento.entity';
// import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
// import { Vacina } from 'src/vacinas/entities/vacina.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('veterinarios')
export class VeterinarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    especialidade: string;

    @Column({ length: 10 })
    registro_crmv: string;

    @Column()
    pessoa_id: number;

    // @OneToOne(() => Pessoa, { eager: true })
    // @JoinColumn({ name: 'pessoa_id' })
    // pessoa: Pessoa;

    // @OneToMany(() => Vacina, (vacina) => vacina.veterinario)
    // vacinas: Vacina[];

    // @OneToMany(() => Medicamento, (medicamento) => medicamento.veterinario)
    // medicamentos: Medicamento[];

    // @OneToMany(() => Castracao, (castracao) => castracao.veterinario)
    // castracoes: Castracao[];
}
