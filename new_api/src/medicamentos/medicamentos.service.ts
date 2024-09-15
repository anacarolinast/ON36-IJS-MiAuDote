import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Medicamento } from './entities/medicamento.entity';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

@Injectable()
export class MedicamentosService {
  constructor(
    @InjectRepository(Medicamento)
    private readonly medicamentoRepository: Repository<Medicamento>,
  ) {}

  async findAll(): Promise<Medicamento[]> {
    return this.medicamentoRepository.find();
  }

  async findOne(id: number): Promise<Medicamento> {
    const medicamento = await this.medicamentoRepository.findOne({
      where: { id },
    });
    if (!medicamento) {
      throw new NotFoundException(`Medicamento with ID ${id} not found`);
    }
    return medicamento;
  }

  async create(createMedicamentoDto: CreateMedicamentoDto): Promise<Medicamento> {
    const medicamento = this.medicamentoRepository.create(createMedicamentoDto);
    return this.medicamentoRepository.save(medicamento);
  }

  async update(id: number, updateMedicamentoDto: UpdateMedicamentoDto): Promise<Medicamento> {
    const medicamento = await this.findOne(id);
    Object.assign(medicamento, updateMedicamentoDto);
    return this.medicamentoRepository.save(medicamento);
  }

  async remove(id: number): Promise<{ affected: number }> {
    const result: DeleteResult = await this.medicamentoRepository.delete(id);
    if (result.affected === undefined) {
      throw new NotFoundException(`Medicamento with ID ${id} not found`);
    }
    return { affected: result.affected };
  }
}
