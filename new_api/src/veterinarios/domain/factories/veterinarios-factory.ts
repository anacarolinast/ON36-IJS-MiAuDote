// import { Injectable } from "@nestjs/common";
// import { Veterinario } from "../veterinarios";
// import { v4 as uuidv4 } from 'uuid';
// import { CreateVeterinarioDto } from "src/veterinarios/presenters/http/dto/create-veterinario.dto";
// import { Pessoa } from "src/pessoas/domain/pessoas";
// import { Vacina } from "src/vacinas/domain/vacinas";
// import { Medicamento } from "src/medicamentos/domain/medicamentos";
// import { Castracao } from "src/castracoes/domain/castracao";

// @Injectable()
// export class VeterinarioFactory {
//     create(data: CreateVeterinarioDto, pessoa: Pessoa): Veterinario {
//         const veterinarioId = uuidv4();
//         const vacinas: Vacina[] = [];
//         const medicamentos: Medicamento[] = [];
//         const castracao: Castracao[] = [];
//         return new Veterinario(
//             veterinarioId,
//             data.especialidade,
//             data.registro_crmv,
//             pessoa.id,
//             pessoa,
//             vacinas,
//             medicamentos,
//             castracao
//         )
//     }
// }