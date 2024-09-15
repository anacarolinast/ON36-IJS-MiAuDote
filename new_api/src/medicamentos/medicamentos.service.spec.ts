import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentosService } from './medicamentos.service';
import { Medicamento } from './entities/medicamento.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('MedicamentosService', () => {
  let service: MedicamentosService;
  let repository: Repository<Medicamento>;

  const mockMedicamentoRepository = {
    find: jest.fn().mockResolvedValue([{
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Antibiótico',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Antibiótico',
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
    save: jest.fn().mockImplementation((medicamento) => Promise.resolve(medicamento)),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicamentosService,
        {
          provide: getRepositoryToken(Medicamento),
          useValue: mockMedicamentoRepository,
        },
      ],
    }).compile();

    service = module.get<MedicamentosService>(MedicamentosService);
    repository = module.get<Repository<Medicamento>>(getRepositoryToken(Medicamento));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all medicamentos', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Antibiótico',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return one medicamento by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Antibiótico',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    });
    expect(repository.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new medicamento', async () => {
    const createDto = {
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Antibiótico',
      veterinario_id: 1,
      gasto_id: 1,
    };
    const result = await service.create(createDto);
    expect(result).toEqual({
      id: expect.any(Number),
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Antibiótico',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    });
    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should update a medicamento', async () => {
    const updateDto = {
      descricao: 'Vacina',
    };
    const result = await service.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Vacina',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should delete a medicamento', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(repository.remove).toHaveBeenCalledWith({ id: 1 });
  });
});
