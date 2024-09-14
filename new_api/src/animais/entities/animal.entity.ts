import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('animais')
export class Animal {
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
}
