import { Inject, Injectable } from '@nestjs/common';
import { VacinaRepository } from '../../../../../vacinas/application/ports/vacinas.repository';
import { Vacina } from '../../../../../vacinas/domain/vacinas';
import { VacinaEntity } from '../entities/vacina.entity';
import { VacinaMapper } from '../mappers/vacina.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { Repository } from 'typeorm';
import { GastoEntity } from 'src/gastos/infrastructure/persistence/type-orm/entities/gasto.entity';

@Injectable()
export class TypeOrmVacinaRepository implements VacinaRepository {
    constructor(
        private readonly vacinaMapper: VacinaMapper,
        @Inject(GastoRepository)
        private readonly gastoRepository: GastoRepository,
        @InjectRepository(VacinaEntity)
        private readonly vacinaRepository: Repository<VacinaEntity>,
    ) {}

    async save(vacina: Vacina): Promise<Vacina> {
        const gastoEntity = new GastoEntity();
        gastoEntity.data_gasto = vacina.data_gasto;
        gastoEntity.tipo = vacina.tipo;
        gastoEntity.quantidade = vacina.quantidade;
        gastoEntity.valor = vacina.valor;
    
        const savedGasto = await this.gastoRepository.save(gastoEntity);
        console.log('Gasto salvo:', savedGasto); // Log do gasto salvo
    
        const vacinaEntity = await this.vacinaMapper.paraPersistencia(vacina);
        vacinaEntity.gasto_id = savedGasto.id; // Definindo o gasto_id
        vacinaEntity.gasto = savedGasto; // Associando o gasto
    
        console.log('Vacina a ser salva:', vacinaEntity); // Log da vacina antes de salvar
    
        const savedVacinaEntity = await this.vacinaRepository.save(vacinaEntity);
        console.log('Vacina salva:', savedVacinaEntity); // Log da vacina salva
    
        return VacinaMapper.paraDominio(savedVacinaEntity);
    }
    

    async findAll(): Promise<Vacina[]> {
        const entities = await this.vacinaRepository.find({
            relations: ['gasto'],
        });
        return entities.map(VacinaMapper.paraDominio);
    }

    async findById(id: number): Promise<Vacina | null> {
        const entity = await this.vacinaRepository.findOne({
            where: { id },
            relations: ['gasto'],
        });
        if (!entity) return null;
        return VacinaMapper.paraDominio(entity);
    }

    async update(id: number, vacina: Partial<Vacina>): Promise<Vacina | null> {
        const existingVacinaEntity = await this.vacinaRepository.findOne({
            where: { id },
            relations: ['gasto'],
          });
        if (!existingVacinaEntity) return null;

        existingVacinaEntity.data_vacinacao = vacina.data_vacinacao ?? existingVacinaEntity.data_vacinacao;
        existingVacinaEntity.tipo_vacina = vacina.tipo_vacina ?? existingVacinaEntity.tipo_vacina;

        const updatedVacinaEntity = await this.vacinaRepository.save({...existingVacinaEntity, ...vacina});

        return VacinaMapper.paraDominio(updatedVacinaEntity);
    }

    async remove(id: number): Promise<void> {
        const result = await this.vacinaRepository.delete(id);
        if (result.affected === 0) {
          console.log(`Vacina com ID ${id} não encontrado.`);
        } else {
          console.log(`Vacina com ID ${id} removido.`);
        }
      }

      async findByAnimalAndTipoVacina(animalId: number, tipoVacina: string): Promise<Vacina | null> {
        const vacinaEntity = await this.vacinaRepository.findOne({
            where: {
                animal_id: animalId,
                tipo_vacina: tipoVacina,
            },
            relations: ['gasto'],
        });
    
        if (!vacinaEntity) {
            console.log(`Nenhuma vacina encontrada para o animal ${animalId} e tipo ${tipoVacina}.`);
            return null;
        }
    
        console.log(`Vacina encontrada para o animal ${animalId} e tipo ${tipoVacina}.`);
        return VacinaMapper.paraDominio(vacinaEntity);
    }
    
}