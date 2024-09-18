export class Vacina {
    constructor(
        public readonly id: number,
        public readonly animal_id: number,
        public readonly data_vacinacao: Date,
        public readonly tipo_vacina: string,
        public readonly veterinario_id: number,
        public readonly gasto_id: number,
        public readonly animal?: any,
        public readonly veterinario?: any,
        public readonly gasto?: any,
    ) {}
}