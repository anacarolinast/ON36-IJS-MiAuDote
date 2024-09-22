import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DoadorRepository } from 'src/doadores/application/ports/doador.repository';
import { Doador } from 'src/doadores/domain/doadores';
import { DoadorEntity } from '../entities/doador.entity';
import { DoadorMapper } from '../mappers/doador.mappers';

@Injectable()
export class InMemoryDoadorRepository implements DoadorRepository {
  private readonly doadores = new Map<number, DoadorEntity>();
  private idCounter = 1;

  async save(doador: Doador): Promise<Doador> {
    const doadorEntity = DoadorMapper.paraPersistencia(doador);
    doadorEntity.id = this.idCounter++;
    this.doadores.set(doadorEntity.id, doadorEntity);
    console.log(`Doador ${doadorEntity.id} criado com sucesso!`);
    return DoadorMapper.paraDominio(doadorEntity);
  }

  async findAll(): Promise<Doador[]> {
    console.log("Listando todos os doadores...");
    return Array.from(this.doadores.values());
  }

  async findById(id: number): Promise<Doador | null> {
    const doador = this.doadores.get(id);
    if (doador) {
        console.log(`Doador encontrado: ${doador.id}`);
        return doador;
    } else {
        console.log(`Doador com ID ${id} não encontrado.`);
        return null;
    }
  }

  async update(id: number, doador: Partial<Doador>): Promise<Doador | null> {
    const existingDoador = this.doadores.get(id);
    if (existingDoador) {
        const updatedAdotante = { ...existingDoador, ...doador } as DoadorEntity;
        this.doadores.set(id, updatedAdotante);
        console.log(`Doador com ID ${id} atualizado com sucesso!`);
        return updatedAdotante;
    } else {
        console.log(`Doador com ID ${id} não encontrado para atualização.`);
        return null;
    }

  }

  async remove(id: number): Promise<void> {
    if (this.doadores.has(id)) {
      this.doadores.delete(id);
      console.log(`Doador com ID ${id} removido com sucesso!`);
  } else {
      console.log(`Doador com ID ${id} não encontrado para remoção.`);
  }
}
}
