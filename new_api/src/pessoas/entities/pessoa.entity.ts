import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pessoas')
export class Pessoa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    nome: string;

    @Column({ length: 255 })
    endereco: string;

    @Column('text') 
    telefone: string[];

    @Column({ length: 255 })
    email: string;

    @Column({ length: 255 })
    cpf: string;
}
