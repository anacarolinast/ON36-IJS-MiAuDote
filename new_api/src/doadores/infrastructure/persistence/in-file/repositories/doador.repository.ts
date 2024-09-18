import { Injectable } from '@nestjs/common';
import { DoadorRepository } from 'src/doadores/application/ports/doador.repository'; 
import { Doador } from '../../../../domain/doadores';
import { DoadorEntity } from '../entities/doador.entity';

@Injectable()
export class InFileDoadorRepository implements DoadorRepository {

  async save(doador: Doador): Promise<Doador> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Doador[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: number): Promise<Doador | null> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, doador: Partial<Doador>): Promise<Doador | null> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private readonly doadores = new Map<string, DoadorEntity>();
}