import { Injectable } from '@nestjs/common';
import { AdotanteRepository } from 'src/adotantes/application/ports/adotantes.repository'; 
import { Adotante } from '../../../../domain/adotante';
import { AdotanteEntity } from '../entities/adotante.entity';

@Injectable()
export class InFileAdotanteRepository implements AdotanteRepository {

  async save(adotante: Adotante): Promise<Adotante> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Adotante[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: number): Promise<Adotante | null> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, adotante: Partial<Adotante>): Promise<Adotante | null> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private readonly adotantes = new Map<string, AdotanteEntity>();
}