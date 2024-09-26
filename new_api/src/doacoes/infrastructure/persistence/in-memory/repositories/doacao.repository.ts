import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DoacaoRepository } from 'src/doacoes/application/ports/doacao.repository';
import { Doacao } from 'src/doacoes/domain/doacoes';
import { DoacaoEntity } from '../entities/doacao.entity';
import { DoacaoMapper } from '../mappers/doacao.mappers';

@Injectable()
export class InMemoryDoacaoRepository implements DoacaoRepository {
  private readonly doacao = new Map<number, DoacaoEntity>();
  private idCounter = 1;
  gastoRepository: any;
  doadorRepository: any;

  async save(doacao: Doacao): Promise<Doacao> {
    const doacaoEntity = DoacaoMapper.paraPersistencia(doacao);
    doacaoEntity.id = this.idCounter++;
    this.doacao.set(doacaoEntity.id, doacaoEntity);

    console.log(`Doação criada com sucesso!`); 
    return DoacaoMapper.paraDominio(doacaoEntity);
  }

  async findAll(): Promise<Doacao[]> {
    console.log("Listando todas as doacoes...");
    return Array.from(this.doacao.values());
  }

  async findById(id: number): Promise<Doacao | null> {
    const doacao = this.doacao.get(id);
    if (doacao) {
        console.log(`Doacao encontrada: ${doacao.id}`);
        return doacao;
    } else {
        console.log(`Doacao com ID ${id} não encontrada.`);
        return null;
    }
  }

  async update(id: number, doacao: Partial<Doacao>): Promise<Doacao | null> {
    const existingDoacao = this.doacao.get(id);
    if (existingDoacao) {
        const updatedDoacao = DoacaoMapper.paraPersistencia({ ...existingDoacao, ...doacao });
        this.doacao.set(id, updatedDoacao);
        console.log(`Doacao com ID ${id} atualizada com sucesso!`);
        return updatedDoacao;
    } else {
        console.log(`Doacao com ID ${id} não encontrada para atualização.`);
        return null;
    }
  }

  async remove(id: number): Promise<void> {
    if (this.doacao.has(id)) {
        this.doacao.delete(id);
        console.log(`Doacao com ID ${id} removida com sucesso!`);
    } else {
        console.log(`Doacao com ID ${id} não encontrada para remoção.`);
    }
  }
}

