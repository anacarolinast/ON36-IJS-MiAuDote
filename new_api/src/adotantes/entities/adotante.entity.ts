import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("adotante")
export class Adotante {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    renda: number;

    @Column()
    condicao_entrevista: string;

    @Column()
    pessoa_id: number;
}
