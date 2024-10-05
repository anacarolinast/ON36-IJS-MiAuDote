import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Adocao } from '../domain/adocao';
import { CreateAdocaoDto } from '../presenters/http/dto/create-adocao.dto';
import { UpdateAdocaoDto } from '../presenters/http/dto/update-adocao.dto';
import { AdocaoFactory } from '../domain/factories/adocoes-factory';
import { AdocaoRepository } from './ports/adocoes.repository';
import { AnimalRepository } from '../../animais/application/ports/animais.repository';
import { AdotanteRepository } from '../../adotantes/application/ports/adotantes.repository';
import { Animal } from 'src/animais/domain/animal';
import { Adotante } from 'src/adotantes/domain/adotante';

@Injectable()
export class AdocoesService {
  constructor(
    private readonly adocaoFactory: AdocaoFactory,
    private readonly adocaoRepository: AdocaoRepository,
    private readonly animalRepository: AnimalRepository,
    private readonly adotanteRepository: AdotanteRepository,
  ) {}

  async findAll(): Promise<Adocao[]> {
    return this.adocaoRepository.findAll();
  }

  async findOne(id: number): Promise<Adocao> {
    const adocao = await this.adocaoRepository.findById(id);
    if (!adocao) {
      throw new NotFoundException(`Adocao with ID ${id} not found`);
    }
    return adocao;
  }

  private async findAnimal(animalId: number): Promise<Animal> {
    const animal = await this.animalRepository.findById(animalId);
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${animalId} not found`);
    }
    return animal;
  }

  private async findAdotante(adotanteId: number): Promise<Adotante> {
    const adotante = await this.adotanteRepository.findById(adotanteId);
    if (!adotante) {
      throw new NotFoundException(`Adotante with ID ${adotanteId} not found`);
    }
    return adotante;
  }

  private checkIfAnimalIsAdopted(animal: Animal): void {
    if (animal.estado_adocao === 'Adotado') {
      throw new ConflictException(`Animal with ID ${animal.id} is already adopted.`);
    }
  }

  private checkAdoptionHistory(adotante: Adotante): void {
    if (adotante.adocao.length >= 3) {
      throw new ConflictException(
        `Adotante with ID ${adotante.id} has already adopted 3 animals.`
      );
    }
  }

  private checkAnimalAdoptionState(animal: Animal): void {
    const estadosIndisponiveis = ['indisponivel', 'faleceu', 'adotado']; 
    if (estadosIndisponiveis.includes(animal.estado_adocao)) {
      throw new ConflictException(`Animal com ID ${animal.id} não está disponível para adoção. Estado atual: ${animal.estado_adocao}.`);
    }
  }

  async create(createAdocaoDto: CreateAdocaoDto): Promise<Adocao> {
    const animal = await this.findAnimal(createAdocaoDto.animal_id);
    const adotante = await this.findAdotante(createAdocaoDto.adotante_id);

    this.checkAnimalAdoptionState(animal);
    this.checkIfAnimalIsAdopted(animal);
    this.checkAdoptionHistory(adotante);

    const newAdocao = this.adocaoFactory.create(
      createAdocaoDto,
      animal,
      adotante,
    );

    const savedAdocao = await this.adocaoRepository.save(newAdocao);

    const { adotante: _, ...adotanteData } = savedAdocao;
    adotante.adocao.push(savedAdocao);
    await this.adotanteRepository.adopt(adotante.id, adotanteData);
    console.log(`${animal.nome} registrado na lista de animais adotados de ${adotante.nome} com sucesso!`);

    const { animal: __, ...animalData } = savedAdocao;
    await this.animalRepository.adopt(animal.id, animalData);
    console.log(`Status de ${animal.nome} atualizado para: ADOTADO!`);

    return savedAdocao;
  }

  async update(id: number, updateAdocaoDto: UpdateAdocaoDto): Promise<Adocao> {
    const adocao = await this.findOne(id);
    
    const animal = updateAdocaoDto.animal_id
      ? await this.animalRepository.findById(updateAdocaoDto.animal_id)
      : adocao.animal;

    const adotante = updateAdocaoDto.adotante_id
      ? await this.adotanteRepository.findById(updateAdocaoDto.adotante_id)
      : adocao.adotante;

    if (!animal || !adotante) {
      throw new NotFoundException('Animal ou Adotante não encontrado.');
    }

    const updatedAdocao = this.adocaoFactory.create(
      { ...adocao, ...updateAdocaoDto },
      animal,
      adotante,
    );

    await this.adocaoRepository.update(id, updatedAdocao);
    return updatedAdocao;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.adocaoRepository.remove(id);
    return { deleted: true };
  }
}
