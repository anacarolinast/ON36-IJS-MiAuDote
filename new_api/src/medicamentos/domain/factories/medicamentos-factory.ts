import { Injectable } from '@nestjs/common';
import { Medicamento } from '../medicamentos';
import { v4 as uuidv4 } from 'uuid';
import { CreateMedicamentoDto } from 'src/medicamentos/presenters/http/dto/create-medicamento.dto';
import { Veterinario } from 'src/veterinarios/domain/veterinarios';
import { Animal } from 'src/animais/domain/animal';

@Injectable()
export class MedicamentoFactory {
  create(data: CreateMedicamentoDto, veterinario: Veterinario, animal: Animal): Medicamento {
    const castracaoId = uuidv4();

    return new Medicamento(
      castracaoId,
      animal.id,
      data.data_compra,
      data.descricao,
      data.gasto_id,
      veterinario.id
    );
  }
}