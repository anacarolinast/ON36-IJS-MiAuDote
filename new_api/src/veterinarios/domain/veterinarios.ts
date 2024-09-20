import { Vacina } from 'src/vacinas/domain/vacinas';
import { Medicamento } from 'src/medicamentos/domain/medicamentos';
import { Castracao } from 'src/castracoes/domain/castracao';

export class Veterinario {
    constructor (
        public readonly id: number,
        public readonly especialidade: string,
        public readonly registro_crmv: string,
        public readonly pessoa_id: number,
        public readonly pessoa?: any,
        public readonly vacinas?: Vacina[],
        public readonly medicamentos?: Medicamento[],
        public readonly castracoes?: Castracao[],
    ) {}
}