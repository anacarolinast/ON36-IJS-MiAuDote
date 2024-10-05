import { Injectable } from '@nestjs/common';
import { Consumivel } from 'src/consumiveis/domain/consumivel';

@Injectable()
export abstract class ConsumivelRepository {
  abstract save(consumivel: Consumivel): Promise<Consumivel>;
  abstract findAll(): Promise<Consumivel[]>;
  abstract findById(id: number): Promise<Consumivel | null>;
  abstract update(id: number, consumivel: Partial<Consumivel>): Promise<Consumivel | null>;
  abstract remove(id: number): Promise<void>;
}
