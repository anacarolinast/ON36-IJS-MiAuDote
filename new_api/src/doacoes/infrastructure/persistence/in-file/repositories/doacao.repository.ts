import { Injectable } from '@nestjs/common';
import { DoacaoRepository } from 'src/doacoes/application/ports/doacao.repository'; 
import { Doacao } from '../../../../domain/doacoes';
import { DoacaoEntity } from '../entities/doacao.entity';

@Injectable()
export class InFileDoacaoRepository implements DoacaoRepository {

  async save(doacao: Doacao): Promise<Doacao> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Doacao[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: number): Promise<Doacao | null> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, doacao: Partial<Doacao>): Promise<Doacao | null> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private readonly doacoes = new Map<string, DoacaoEntity>();
}