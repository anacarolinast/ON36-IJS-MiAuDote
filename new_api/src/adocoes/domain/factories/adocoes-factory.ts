import { Injectable } from '@nestjs/common';
import { Adocao } from '../adocao';
import { v4 as uuidv4 } from 'uuid';
import { CreateAdocaoDto } from 'src/adocoes/presenters/http/dto/create-adocao.dto';
import { AnimalRepository } from 'src/animais/application/ports/animais.repository'; 
import { AdotanteRepository } from 'src/adotantes/application/ports/adotantes.repository'; 
import { Animal } from 'src/animais/domain/animal';
import { Adotante } from 'src/adotantes/domain/adotante';

@Injectable()
export class AdocaoFactory {
  constructor(
    private readonly animalRepository: AnimalRepository,
    private readonly adotanteRepository: AdotanteRepository,
  ) {}

  async create(data: CreateAdocaoDto): Promise<Adocao> {
    const adocaoId = uuidv4();

    const animal: Animal = await this.animalRepository.findById(data.animal_id);
    const adotante: Adotante = await this.adotanteRepository.findById(data.adotante_id);

    if (!animal || !adotante) {
      throw new Error('Animal ou Adotante não encontrado.');
    }

    return new Adocao(
      adocaoId,
      adotante.id,
      animal.id,
      data.data_adocao,
      data.condicoes_especiais,
      data.status_aprovacao,
      animal,
      adotante
    );
  }
}
