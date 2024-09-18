import { Injectable } from "@nestjs/common";
import { Veterinario } from "../veterinarios";
import { v4 as uuidv4 } from 'uuid';
import { CreateVeterinarioDto } from "src/veterinarios/presenters/http/dto/create-veterinario.dto";

@Injectable()
export class VeterinarioFactory {
    create(data: CreateVeterinarioDto): Veterinario {
        const veterinarioId = uuidv4();

        return new Veterinario(
            veterinarioId,
            data.especialidade,
            data.registro_crmv,
            data.pessoa_id,
            null,
            null,
            null,
            null,
        )
    }
}