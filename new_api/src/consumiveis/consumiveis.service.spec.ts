import { Test, TestingModule } from '@nestjs/testing';
import { ConsumiveisService } from './consumiveis.service';
import { Consumivel } from './entities/consumivel.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ConsumiveisService', () => {
  let service: ConsumiveisService;
  let repository: Repository<Consumivel>;

  const mockConsumivelRepository = {
    find: jest.fn().mockResolvedValue([{
      id: 1,
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    }),
    create: jest.fn().mockImplementation((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    save: jest.fn().mockImplementation((consumivel) => Promise.resolve(consumivel)),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumiveisService,
        {
          provide: getRepositoryToken(Consumivel),
          useValue: mockConsumivelRepository,
        },
      ],
    }).compile();

    service = module.get<ConsumiveisService>(ConsumiveisService);
    repository = module.get<Repository<Consumivel>>(getRepositoryToken(Consumivel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all consumiveis', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{
      id: 1,
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    }]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return one consumivel by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    });
    expect(repository.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new consumivel', async () => {
    const createDto = {
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    };
    const result = await service.create(createDto);
    expect(result).toEqual({
      id: expect.any(Number),
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    });
    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should update a consumivel', async () => {
    const updateDto = {
      tipo_animal: 'Gato',
      descricao: 'Areia',
    };
    const result = await service.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      tipo_animal: 'Gato',
      descricao: 'Areia',
      gasto_id: 1,
    });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should delete a consumivel', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(repository.remove).toHaveBeenCalledWith({ id: 1 });
  });
});
