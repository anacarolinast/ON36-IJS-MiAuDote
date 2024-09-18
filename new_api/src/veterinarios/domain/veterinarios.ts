export class Veterinario {
    constructor (
        public readonly id: number,
        public readonly especialidade: string,
        public readonly registro_crmv: string,
        public readonly pessoa_id: number,
        public readonly pessoa?: any,
        public readonly vacinas?: any[],
        public readonly medicamentos?: any[],
        public readonly castracoes?: any[],
    ) {}
}