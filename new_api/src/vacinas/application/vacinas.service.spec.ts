import { Test, TestingModule } from '@nestjs/testing';
import { VacinaRepository } from '../application/ports/vacinas.repository';
import { VacinaFactory } from "../domain/factories/vacinas-factory";
import { VacinasService } from './vacinas.service'; 
import { CreateVacinaDto } from '../presenters/http/dto/create-vacina.dto';
import { UpdateVacinaDto } from '../presenters/http/dto/update-vacina.dto';
import { Vacina } from '../domain/vacinas';

describe('VacinasService', () => {
  let service: VacinasService;
  let vacinaFactory: VacinaFactory;
  let vacinaRepository: VacinaRepository;

  const createVacinaDto: CreateVacinaDto = {
    animal_id: 1,
    data_vacinacao: new Date('2024-09-18T14:30:00Z'),
    tipo_vacina: 'Vacina A',
    veterinario_id: 1,
    gasto_id: 1,
  };
  

  const updateVacinaDto: UpdateVacinaDto = {
    animal_id: 1,
    data_vacinacao: new Date('2024-09-18T14:30:00Z'),
    tipo_vacina: 'Vacina B',
    veterinario_id: 1,
    gasto_id: 1,
  };

  const vacina = new Vacina(
    1,
    1,
    new Date(),
    'Vacina A',
    1,
    1,
  );

  beforeEach(async () => {
    vacinaFactory = {
      create: jest.fn().mockImplementation((data) => {
        return new Vacina(
          1,
          data.animal_id,
          data.data_vacinacao,
          data.tipo_vacina,
          data.veterinario_id,
          data.gasto_id,
        );
      }),
    };

    vacinaRepository = {
      save: jest.fn().mockImplementation((vacina: Vacina) => Promise.resolve(vacina)),
      findAll: jest.fn().mockResolvedValue([vacina]),
      findById: jest.fn().mockResolvedValue(vacina),
      update: jest.fn().mockResolvedValue(vacina),
      remove: jest.fn().mockResolvedValue(undefined),
    } as unknown as VacinaRepository;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VacinasService,
        {
          provide: VacinaRepository,
          useValue: vacinaRepository,
        },
        {
          provide: VacinaFactory,
          useValue: vacinaFactory,
        },
      ],
    }).compile();

    service = module.get<VacinasService>(VacinasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a vacina', async () => {
    const createdVacina = await service.create(createVacinaDto);
    expect(createdVacina).toBeInstanceOf(Vacina);
    expect(createdVacina.animal_id).toBe(createVacinaDto.animal_id);
    expect(vacinaRepository.save).toHaveBeenCalledWith(expect.any(Vacina));
  });

  it('should return all vacinas', async () => {
    const vacinas = await service.findAll();
    expect(vacinas).toHaveLength(1);
    expect(vacinas[0]).toBeInstanceOf(Vacina);
    expect(vacinas[0].tipo_vacina).toBe(vacina.tipo_vacina);
  });

  it('should return a vacina by ID', async () => {
    const foundVacina = await service.findOne(1);
    expect(foundVacina).toBeInstanceOf(Vacina);
    expect(foundVacina.id).toBe(1);
    expect(foundVacina.tipo_vacina).toBe(vacina.tipo_vacina);
  });

  it('should update a vacina', async () => {
    const updatedVacina = await service.update(1, updateVacinaDto);
    expect(updatedVacina).toBeInstanceOf(Vacina);
    expect(updatedVacina.tipo_vacina).toBe(updateVacinaDto.tipo_vacina);
    expect(vacinaRepository.update).toHaveBeenCalledWith(1, expect.any(Vacina));
  });

  it('should remove a vacina', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ deleted: true });
    expect(vacinaRepository.remove).toHaveBeenCalledWith(1);
  });
});
