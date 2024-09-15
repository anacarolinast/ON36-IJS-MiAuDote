import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Consumivel } from './entities/consumivel.entity';
import { CreateConsumivelDto } from './dto/create-consumivel.dto';
import { UpdateConsumivelDto } from './dto/update-consumivel.dto';

@Injectable()
export class ConsumiveisService {
  constructor(
    @InjectRepository(Consumivel)
    private readonly consumivelRepository: Repository<Consumivel>,
  ) {}

  async findAll(): Promise<Consumivel[]> {
    return this.consumivelRepository.find();
  }

  async findOne(id: number): Promise<Consumivel | undefined> {
    const options: FindOneOptions<Consumivel> = { where: { id } };
    return this.consumivelRepository.findOne(options);
  }

  async create(createConsumivelDto: CreateConsumivelDto): Promise<Consumivel> {
    const consumivel = this.consumivelRepository.create(createConsumivelDto);
    return this.consumivelRepository.save(consumivel);
  }

  async update(id: number, updateConsumivelDto: UpdateConsumivelDto): Promise<Consumivel> {
    await this.consumivelRepository.update(id, updateConsumivelDto);
    return this.findOne(id); 
  }

  async remove(id: number): Promise<{ affected: number }> {
    const result = await this.consumivelRepository.delete(id);
    return { affected: result.affected };
  }
}
