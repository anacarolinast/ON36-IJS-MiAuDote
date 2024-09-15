import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adotante } from './entities/adotante.entity';
import { CreateAdotanteDto } from './dto/create-adotante.dto';
import { UpdateAdotanteDto } from './dto/update-adotante.dto';

@Injectable()
export class AdotantesService {
  constructor(
    @InjectRepository(Adotante)
    private readonly adotanteRepository: Repository<Adotante>,
  ) {}

  async create(createAdotanteDto: CreateAdotanteDto): Promise<Adotante> {
    const adotante = this.adotanteRepository.create(createAdotanteDto);
    return this.adotanteRepository.save(adotante);
  }

  async findAll(): Promise<Adotante[]> {
    return this.adotanteRepository.find();
  }

  async findOne(id: number): Promise<Adotante | null> {
    return this.adotanteRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAdotanteDto: UpdateAdotanteDto): Promise<Adotante> {
    await this.adotanteRepository.update(id, updateAdotanteDto);
    return this.adotanteRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<{ id: number }> {
    await this.adotanteRepository.delete(id);
    return { id };
  }
}
