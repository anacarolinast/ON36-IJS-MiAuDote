import { Adocao } from 'src/adocoes/entities/adocao.entity';
import { Medicamento } from 'src/medicamentos/entities/medicamento.entity';
import { Vacina } from 'src/vacinas/entities/vacina.entity';
import { Castracao } from 'src/castracoes/entities/castracao.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('animais')
export class AnimalEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    nome: string;

    @Column({ length: 255 })
    especie: string; 

    @Column({ length: 1 })
    sexo: string; 

    @Column({ type: 'date' })
    data_nascimento: Date; 

    @Column({ length: 255 })
    condicao_saude: string; 

    @Column({ length: 255 })
    estado_adocao: string;

    @OneToOne(() => Adocao, (adocao) => adocao.animal)
    adocao: Adocao;

    @OneToMany(() => Medicamento, (medicamento) => medicamento.animal)
    medicamentos: Medicamento[];

    @OneToMany(() => Vacina, (vacina) => vacina.animal)
    vacinas: Vacina[];

    @OneToOne(() => Castracao, (castracao) => castracao.animal)
    castracao: Castracao;
}
