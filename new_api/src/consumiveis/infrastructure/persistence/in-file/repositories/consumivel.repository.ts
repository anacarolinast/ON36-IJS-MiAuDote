import { Injectable } from '@nestjs/common';
import { ConsumivelRepository } from 'src/consumiveis/application/ports/consumiveis.repository'; 
import { Consumivel } from '../../../../domain/consumivel';
import { ConsumivelEntity } from '../entities/consumivel.entity';

@Injectable()
export class InFileConsumivelRepository implements ConsumivelRepository {

  async save(consumivel: Consumivel): Promise<Consumivel> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Consumivel[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: number): Promise<Consumivel | null> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, consumivel: Partial<Consumivel>): Promise<Consumivel | null> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private readonly consumiveis = new Map<string, ConsumivelEntity>();
}