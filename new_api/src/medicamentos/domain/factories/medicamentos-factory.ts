import { Injectable } from '@nestjs/common';
import { Medicamento } from '../medicamentos';
import { v4 as uuidv4 } from 'uuid';
import { CreateMedicamentoDto } from 'src/medicamentos/presenters/http/dto/create-medicamento.dto';

@Injectable()
export class MedicamentoFactory {
  create(data: CreateMedicamentoDto): Medicamento {
    const castracaoId = uuidv4();

    return new Medicamento(
      castracaoId,
      data.animal_id,
      data.data_compra,
      data.descricao,
      data.gasto_id,
      data.veterinario_id
    );
  }
}