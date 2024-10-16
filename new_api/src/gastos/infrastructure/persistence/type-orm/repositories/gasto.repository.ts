import { Injectable } from '@nestjs/common';
import { GastoRepository } from '../../../../../gastos/application/ports/gasto.repository';
import { Gasto } from '../../../../../gastos/domain/gastos';
import { GastoEntity } from '../entities/gasto.entity';
import { GastoMapper } from '../mappers/gasto.mapper';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmGastoRepository implements GastoRepository {
    constructor(
        @InjectRepository(GastoEntity)
        private readonly gastoRepository: Repository<GastoEntity>,
        private readonly gastoMapper: GastoMapper,
    ) {}

    async save(gasto: Gasto): Promise<Gasto> {
        const gastoEntity = await this.gastoMapper.paraPersistencia(gasto);

        const savedGastoEntity = await this.gastoRepository.save(gastoEntity);

        return this.gastoMapper.paraDominio(savedGastoEntity);
    }

    async findAll(): Promise<Gasto[]> {
        const entities = await this.gastoRepository.find();
        return Promise.all(entities.map((item) => this.gastoMapper.paraDominio(item)));
    }

    async findById(id: number): Promise<Gasto | null> {
        const gastoEntity = await this.gastoRepository.findOne({ where: { id } });
        return gastoEntity ? this.gastoMapper.paraDominio(gastoEntity) : null;
    }

    async update(id: number, gasto: Partial<Gasto>): Promise<Gasto | null> {
        const existingGasto = await this.gastoRepository.findOne({ where: { id } });

        if (existingGasto) {
            const updatedGastoEntity = await this.gastoMapper.paraPersistencia({
                ...this.gastoMapper.paraDominio(existingGasto),
                ...gasto,
            });

            await this.gastoRepository.update(id, updatedGastoEntity);
            console.log(`Gasto com ID ${id} atualizado com sucesso!`);

            return this.gastoMapper.paraDominio({ ...existingGasto, ...updatedGastoEntity });
        } else {
            console.log(`Gasto com ID ${id} não encontrado para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        const result = await this.gastoRepository.delete(id);
        if (result.affected > 0) {
            console.log(`Gasto com ID ${id} removido com sucesso!`);
        } else {
            console.log(`Gasto com ID ${id} não encontrado para remoção.`);
        }
    }

}

