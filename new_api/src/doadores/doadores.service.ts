import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Doador } from './entities/doador.entity';
import { CreateDoadorDto } from './dto/create-doador.dto';
import { UpdateDoadorDto } from './dto/update-doador.dto';

@Injectable()
export class DoadoresService {
  constructor(
    @InjectRepository(Doador)
    private readonly doadorRepository: Repository<Doador>,
  ) {}

  async findAll(): Promise<Doador[]> {
    return await this.doadorRepository.find({ relations: ['pessoa', 'doacoes'] });
  }

  async findOne(id: number): Promise<Doador> {
    const doador = await this.doadorRepository.findOne({
      where: { id },
      relations: ['pessoa', 'doacoes'],
    });

    if (!doador) {
      throw new NotFoundException(`Doador with ID ${id} not found`);
    }

    return doador;
  }

  async create(createDoadorDto: CreateDoadorDto): Promise<Doador> {
    const doador = this.doadorRepository.create(createDoadorDto);
    return await this.doadorRepository.save(doador);
  }

  async update(id: number, updateDoadorDto: UpdateDoadorDto): Promise<Doador> {
    const doador = await this.doadorRepository.preload({
      id,
      ...updateDoadorDto,
    });

    if (!doador) {
      throw new NotFoundException(`Doador with ID ${id} not found`);
    }

    return await this.doadorRepository.save(doador);
  }

  async remove(id: number): Promise<{ affected: number | null }> {
    const result: DeleteResult = await this.doadorRepository.delete(id);
    return { affected: result.affected ?? null };
  }
}
