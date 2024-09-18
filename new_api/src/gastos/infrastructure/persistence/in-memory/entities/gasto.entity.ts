// import { Consumivel } from 'src/consumiveis/entities/consumivel.entity';
// import { Doacao } from 'src/doacoes/entities/doacao.entity';
// import { Castracao } from 'src/castracoes/entities/castracao.entity';
// import { Vacina } from 'src/vacinas/entities/vacina.entity';
// import { Medicamento } from 'src/medicamentos/entities/medicamento.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gastos')
export class GastoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data_gasto: Date;

    @Column({ length: 255 })
    tipo: string;

    @Column('int')
    quantidade: number;

    @Column('decimal', { precision: 10, scale: 2 }) 
    valor: number;

    // @OneToOne(() => Consumivel, (consumivel) => consumivel.gasto)
    // consumivel: Consumivel;

    // @OneToOne(() => Doacao, (doacao) => doacao.gasto)
    // doacao: Doacao;

    // @OneToOne(() => Castracao, (castracao) => castracao.gasto)
    // castracao: Castracao;

    // @OneToOne(() => Vacina, (vacina) => vacina.gasto)
    // vacina: Vacina;

    // @OneToOne(() => Medicamento, (medicamento) => medicamento.gasto)
    // medicamento: Medicamento;
}
