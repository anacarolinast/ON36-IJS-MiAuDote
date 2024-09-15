import { Test, TestingModule } from '@nestjs/testing';
import { VacinasService } from './vacinas.service';
import { Vacina } from './entities/vacina.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('VacinasService', () => {
  let service: VacinasService;
  let repository: Repository<Vacina>;

  const mockVacinaRepository = {
    find: jest.fn().mockResolvedValue([{
      id: 1,
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina A',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina A',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }),
    create: jest.fn().mockImplementation((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    save: jest.fn().mockImplementation((vacina) => Promise.resolve(vacina)),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VacinasService,
        {
          provide: getRepositoryToken(Vacina),
          useValue: mockVacinaRepository,
        },
      ],
    }).compile();

    service = module.get<VacinasService>(VacinasService);
    repository = module.get<Repository<Vacina>>(getRepositoryToken(Vacina));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all vacinas', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{
      id: 1,
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina A',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return one vacina by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina A',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    });
    expect(repository.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new vacina', async () => {
    const createDto = {
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina A',
      veterinario_id: 1,
      gasto_id: 1,
    };
    const result = await service.create(createDto);
    expect(result).toEqual({
      id: expect.any(Number),
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina A',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    });
    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should update a vacina', async () => {
    const updateDto = {
      tipo_vacina: 'Vacina B',
    };
    const result = await service.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina B',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should delete a vacina', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(repository.remove).toHaveBeenCalledWith({ id: 1 });
  });
});
