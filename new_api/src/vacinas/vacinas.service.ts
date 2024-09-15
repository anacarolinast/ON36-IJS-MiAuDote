import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Vacina } from './entities/vacina.entity';
import { CreateVacinaDto } from './dto/create-vacina.dto';
import { UpdateVacinaDto } from './dto/update-vacina.dto';

@Injectable()
export class VacinasService {
  constructor(
    @InjectRepository(Vacina)
    private readonly vacinaRepository: Repository<Vacina>,
  ) {}

  async findAll(): Promise<Vacina[]> {
    return this.vacinaRepository.find();
  }

  async findOne(id: number): Promise<Vacina> {
    const vacina = await this.vacinaRepository.findOne({ where: { id } });
    if (!vacina) {
      throw new NotFoundException(`Vacina with ID ${id} not found`);
    }
    return vacina;
  }

  async create(createVacinaDto: CreateVacinaDto): Promise<Vacina> {
    const vacina = this.vacinaRepository.create(createVacinaDto);
    return this.vacinaRepository.save(vacina);
  }

  async update(id: number, updateVacinaDto: UpdateVacinaDto): Promise<Vacina> {
    const vacina = await this.findOne(id); // Ensure the vacina exists
    Object.assign(vacina, updateVacinaDto);
    return this.vacinaRepository.save(vacina);
  }

  async remove(id: number): Promise<{ affected: number }> {
    const result: DeleteResult = await this.vacinaRepository.delete(id);
    if (result.affected === undefined || result.affected === 0) {
      throw new NotFoundException(`Vacina with ID ${id} not found`);
    }
    return { affected: result.affected };
  }
}
