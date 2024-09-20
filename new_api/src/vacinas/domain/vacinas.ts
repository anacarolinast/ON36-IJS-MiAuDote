import { Animal } from 'src/animais/domain/animal';
import { Veterinario } from 'src/veterinarios/domain/veterinarios';
import { Gasto } from 'src/gastos/domain/gastos';

export class Vacina {
    constructor(
        public readonly id: number,
        public readonly animal_id: number,
        public readonly data_vacinacao: Date,
        public readonly tipo_vacina: string,
        public readonly veterinario_id: number,
        public readonly gasto_id: number,
        public readonly animal?: Animal,
        public readonly veterinario?: Veterinario,
        public readonly gasto?: Gasto,
    ) {}
}