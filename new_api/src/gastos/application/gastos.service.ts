import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GastoRepository } from "./ports/gasto.repository";
import { Gasto } from '../domain/gastos';

@Injectable()
export class GastosService {
  constructor(
    private readonly gastoRepository: GastoRepository,
  ) {}

  async findAll(): Promise<Gasto[]> {
    try {
      return await this.gastoRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve records');
    }
  }

  async findOne(id: number): Promise<Gasto> {
    const gasto = await this.gastoRepository.findById(id);
    if (!gasto) {
      throw new Error(`Gasto with ID ${id} not found`);
    }
    return gasto;
  }

  async update(id: number, gastoData: Partial<Gasto>): Promise<Gasto | null> {
    const existingGasto = await this.findOne(id);

    try {
      Object.assign(existingGasto, gastoData);

      await this.gastoRepository.update(id, existingGasto);
      console.log(`Gasto com ID ${id} atualizado com sucesso!`);

      return existingGasto; 
    } catch (error) {
      throw new InternalServerErrorException('Failed to update gasto');
  }
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.findOne(id);

    try {
      await this.gastoRepository.remove(id);
      return { deleted: true };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete gasto');
    }
  }
}
