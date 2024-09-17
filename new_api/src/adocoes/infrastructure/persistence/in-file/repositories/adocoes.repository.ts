import { Injectable } from '@nestjs/common';
import { AdocaoRepository } from 'src/adocoes/application/ports/adocoes.repository'; 
import { Adocao } from '../../../../domain/adocao';
import { AdocaoEntity } from '../entities/adocao.entity';

@Injectable()
export class InFileAdocaoRepository implements AdocaoRepository {

  async save(adocao: Adocao): Promise<Adocao> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Adocao[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: number): Promise<Adocao | null> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, adocao: Partial<Adocao>): Promise<Adocao | null> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private readonly adocoes = new Map<string, AdocaoEntity>();
}