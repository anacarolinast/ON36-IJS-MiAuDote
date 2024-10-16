import { Inject, Injectable } from '@nestjs/common';
import { MedicamentoRepository } from '../../../../../medicamentos/application/ports/medicamento.repository';
import { Medicamento } from '../../../../../medicamentos/domain/medicamentos';
import { MedicamentoEntity } from '../entities/medicamento.entity';
import { MedicamentoMapper } from '../mappers/medicamento.mapper';
import { Gasto } from '../../../../../gastos/domain/gastos';
import { Veterinario } from '../../../../../veterinarios/domain/veterinarios';
import { Animal } from '../../../../../animais/domain/animal';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GastoEntity } from 'src/gastos/infrastructure/persistence/type-orm/entities/gasto.entity';

@Injectable()
export class TypeOrmMedicamentoRepository implements MedicamentoRepository {
    constructor(
        private readonly medicamentoMapper: MedicamentoMapper,
        @Inject(GastoRepository)
        private readonly gastoRepository: GastoRepository,
        @InjectRepository(MedicamentoEntity)
        private readonly medicamentoRepository: Repository<MedicamentoEntity>,
    ) {}

    async save(medicamento: Medicamento): Promise<Medicamento> {
        const gastoEntity = new GastoEntity();

        gastoEntity.data_gasto = medicamento.data_gasto;
        gastoEntity.tipo = medicamento.tipo;
        gastoEntity.quantidade = medicamento.quantidade;
        gastoEntity.valor = medicamento.valor;

        const savedGasto = await this.gastoRepository.save(gastoEntity);

        const medicamentoEntity = await this.medicamentoMapper.paraPersistencia(medicamento);

        medicamentoEntity.gasto_id = savedGasto.id;
        medicamentoEntity.gasto = savedGasto;

        const savedMedicamentoEntity = await this.medicamentoRepository.save(medicamentoEntity);

        return MedicamentoMapper.paraDominio(savedMedicamentoEntity);
    }

    async findAll(): Promise<Medicamento[]> {
        const entities = await this.medicamentoRepository.find({
            relations: ['gasto'],
        });
        return entities.map(MedicamentoMapper.paraDominio);
    }

    async findById(id: number): Promise<Medicamento | null> {
        const entity = await this.medicamentoRepository.findOne({
            where: { id },
            relations: ['gasto'],
        });
        if (!entity) return null;
        return MedicamentoMapper.paraDominio(entity);
    }

    async update(id: number, medicamento: Partial<Medicamento>): Promise<Medicamento | null> {
        const existingMedicamentoEntity = await this.medicamentoRepository.findOne({
            where: { id },
            relations: ['gasto'],
        });
        if (!existingMedicamentoEntity) return null;

        existingMedicamentoEntity.data_compra = medicamento.data_compra ?? existingMedicamentoEntity.data_compra;
        existingMedicamentoEntity.descricao = medicamento.descricao ?? existingMedicamentoEntity.descricao;

        const updatedMedicamentoEntity = await this.medicamentoRepository.save({...existingMedicamentoEntity, ...medicamento});

        return MedicamentoMapper.paraDominio(updatedMedicamentoEntity);
    }

    async remove(id: number): Promise<void> {
        const result = await this.medicamentoRepository.delete(id);
        if (result.affected === 0) {
          console.log(`Medicamento com ID ${id} não encontrado.`);
        } else {
          console.log(`Medicamento com ID ${id} removido.`);
        }
      }
}