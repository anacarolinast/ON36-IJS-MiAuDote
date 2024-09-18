export class VeterinarioEntity {
    id: number;
    especialidade: string;
    registro_crmv: string;
    pessoa_id: number;
    pessoa: any;
    vacinas: any[];
    medicamentos: any[];
    castracoes: any[];
}