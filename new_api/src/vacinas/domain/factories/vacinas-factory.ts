import { Injectable } from "@nestjs/common";
import { CreateVacinaDto } from "src/vacinas/presenters/http/dto/create-vacina.dto";
import { Vacina } from "../vacinas";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VacinaFactory {
    create(data: CreateVacinaDto): Vacina {
        const vacinaId = uuidv4();

        return new Vacina(
            vacinaId,
            data.animal_id,
            data.data_vacinacao,
            data.tipo_vacina,
            data.veterinario_id,
            data.gasto_id,
            null,
            null,
            null
        )
    }
}