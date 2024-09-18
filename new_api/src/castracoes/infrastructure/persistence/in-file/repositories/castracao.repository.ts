import { Injectable } from '@nestjs/common';
import { CastracaoRepository } from 'src/castracoes/application/ports/castracoes.repository'; 
import { Castracao } from '../../../../domain/castracao';
import { CastracaoEntity } from '../entities/castracao.entity';

@Injectable()
export class InFileCastracaoRepository implements CastracaoRepository {

  async save(castracao: Castracao): Promise<Castracao> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Castracao[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: number): Promise<Castracao | null> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, castracao: Partial<Castracao>): Promise<Castracao | null> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private readonly castracoes = new Map<string, CastracaoEntity>();
}