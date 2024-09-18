import { Injectable, NotFoundException } from '@nestjs/common';
import { Consumivel } from '../domain/consumivel';
import { CreateConsumivelDto } from '../presenters/http/dto/create-consumivel.dto';
import { UpdateConsumivelDto } from '../presenters/http/dto/update-consumivel.dto';
import { ConsumivelFactory } from '../domain/factories/consumivel-factory';
import { ConsumivelRepository } from './ports/consumiveis.repository';

@Injectable()
export class ConsumiveisService {
  constructor(
    private readonly consumivelFactory: ConsumivelFactory,
    private readonly consumivelRepository: ConsumivelRepository,
  ) {}

  async findAll(): Promise<Consumivel[]> {
    return this.consumivelRepository.findAll();
  }

  async findOne(id: number): Promise<Consumivel> {
    const consumivel = await this.consumivelRepository.findById(id);
    if (!consumivel) {
      throw new NotFoundException(`Consumivel with ID ${id} not found`);
    }
    return consumivel;
  }

  async create(createConsumivelDto: CreateConsumivelDto): Promise<Consumivel> {
    const newConsumivel = this.consumivelFactory.create(createConsumivelDto);
    return this.consumivelRepository.save(newConsumivel);
  }

  async update(id: number, updateConsumivelDto: UpdateConsumivelDto): Promise<Consumivel> {
    const consumivel = await this.findOne(id);

    const updatedConsumivelData = {
      tipo_animal: updateConsumivelDto.tipo_animal ?? consumivel.tipo_animal,
      descricao: updateConsumivelDto.descricao ?? consumivel.descricao,
      gasto_id: updateConsumivelDto.gasto_id ?? consumivel.gasto_id
    };

    const updatedConsumivel = this.consumivelFactory.create(updatedConsumivelData);

    await this.consumivelRepository.update(id, updatedConsumivel);
    return updatedConsumivel;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.consumivelRepository.remove(id);
    return { deleted: true };
  }
}
