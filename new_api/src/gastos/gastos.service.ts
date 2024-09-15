import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Gasto } from './entities/gasto.entity';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gasto)
    private readonly gastoRepository: Repository<Gasto>,
  ) {}

  async findAll(): Promise<Gasto[]> {
    return this.gastoRepository.find();
  }

  async findOne(id: number): Promise<Gasto> {
    const gasto = await this.gastoRepository.findOne({ where: { id } });
    if (!gasto) {
      throw new NotFoundException(`Gasto with ID ${id} not found`);
    }
    return gasto;
  }

  async create(createGastoDto: CreateGastoDto): Promise<Gasto> {
    const gasto = this.gastoRepository.create(createGastoDto);
    return this.gastoRepository.save(gasto);
  }

  async update(id: number, updateGastoDto: UpdateGastoDto): Promise<Gasto> {
    const gasto = await this.gastoRepository.preload({
      id,
      ...updateGastoDto,
    });
    if (!gasto) {
      throw new NotFoundException(`Gasto with ID ${id} not found`);
    }
    return this.gastoRepository.save(gasto);
  }

  async remove(id: number): Promise<{ affected: number }> {
    const result: DeleteResult = await this.gastoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Gasto with ID ${id} not found`);
    }
    return { affected: result.affected ?? 0 }; 
  }
}
