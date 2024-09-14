import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("adocoes")
export class Adocao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    adotante_id: number;

    @Column()
    animal_id: number;

    @Column()
    data_adocao: Date;

    @Column()
    condicoes_especiais: string;

    @Column()
    status_aprovacao: number;

}
