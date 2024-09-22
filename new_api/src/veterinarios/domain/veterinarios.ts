import { Vacina } from 'src/vacinas/domain/vacinas';
import { Medicamento } from 'src/medicamentos/domain/medicamentos';
import { Castracao } from 'src/castracoes/domain/castracao';
import { Pessoa } from 'src/pessoas/domain/pessoas';

export class Veterinario {
    constructor (
        public readonly id: number,
        public readonly especialidade: string,
        public readonly registro_crmv: string,
        public readonly pessoa_id: number,
        public readonly pessoa: Pessoa,
        public readonly vacinas?: Vacina[],
        public readonly medicamentos?: Medicamento[],
        public readonly castracoes?: Castracao[],
    ) {}
}