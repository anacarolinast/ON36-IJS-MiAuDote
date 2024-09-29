import { Vacina } from 'src/vacinas/domain/vacinas';
import { Medicamento } from 'src/medicamentos/domain/medicamentos';
import { Castracao } from 'src/castracoes/domain/castracao';
import { Pessoa } from 'src/pessoas/domain/pessoas';

export class Veterinario extends Pessoa {
    constructor (
        public readonly id: number,
        public readonly especialidade: string,
        public readonly registro_crmv: string,
        public readonly vacinas: Vacina[] = [],
        public readonly medicamentos: Medicamento[] = [],
        public readonly castracoes: Castracao[] = [],
        pessoa_id?: number,
        nome?: string,
        cep?: string,
        endereco?: string,
        telefone?: string[],
        email?: string,
        cpf?: string
    ) {
        super(pessoa_id, nome, cep, endereco, telefone, email, cpf); 
    }
}