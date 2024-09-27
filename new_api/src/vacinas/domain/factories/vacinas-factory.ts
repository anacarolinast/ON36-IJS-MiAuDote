import { Injectable } from "@nestjs/common";
import { CreateVacinaDto } from "src/vacinas/presenters/http/dto/create-vacina.dto";
import { Vacina } from "../vacinas";
import { v4 as uuidv4 } from 'uuid';
import { Veterinario } from "src/veterinarios/domain/veterinarios";

@Injectable()
export class VacinaFactory {
    create(data: CreateVacinaDto, veterinario: Veterinario): Vacina {
        const vacinaId = uuidv4();

        return new Vacina(
            vacinaId,
            data.animal_id,
            data.data_vacinacao,
            data.tipo_vacina,
            veterinario.id,
            data.gasto_id,
            null,
            veterinario,
            null
        )
    }
}