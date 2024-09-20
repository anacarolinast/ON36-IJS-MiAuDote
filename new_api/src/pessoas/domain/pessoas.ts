import { Doador } from 'src/doadores/domain/doadores';
import { Veterinario } from 'src/veterinarios/domain/veterinarios';
import { Adotante } from 'src/adotantes/domain/adotante';

export class Pessoa {
    constructor(
        public readonly id: number,
        public readonly nome: string,
        public readonly endereco: string,
        public readonly telefone: string[],
        public readonly email: string,
        public readonly cpf: string,
        public readonly veterinario?: Veterinario,
        public readonly adotante?: Adotante,
        public readonly doador?: Doador,
    ) {}
}