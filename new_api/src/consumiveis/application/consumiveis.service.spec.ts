import { Test, TestingModule } from '@nestjs/testing';
import { ConsumiveisService } from './consumiveis.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Consumivel } from '../domain/consumivel';
import { Repository } from 'typeorm';
import { CreateConsumivelDto } from '../presenters/http/dto/create-consumivel.dto';
import { UpdateConsumivelDto } from '../presenters/http/dto/update-consumivel.dto';

describe('Testando ConsumiveisService', () => {
  let service: ConsumiveisService;
  let repository: Repository<Consumivel>;

  const mockConsumivelRepository = {
    create: jest.fn().mockImplementation((dto: CreateConsumivelDto) => dto),
    save: jest.fn().mockImplementation((consumivel: Consumivel) =>
      Promise.resolve({
        id: Date.now(),
        ...consumivel,
      })
    ),
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        tipo_animal: 'Cão',
        descricao: 'Ração',
        gasto_id: 1,
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      tipo_animal: 'Cão',
      descricao: 'Ração Updated',
      gasto_id: 2,
    }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
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

  it('should create a new castration', async () => {
    const dto: CreateConsumivelDto = {
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    };

    const result = await service.create(dto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(dto);
  });

  it('should return an array of castrations', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: 1,
        tipo_animal: 'Cão',
        descricao: 'Ração',
        gasto_id: 1,
      },
    ]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single castration by ID', async () => {
    const id = 1;
    const result = await service.findOne(id);
    expect(result).toEqual({
      id,
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    });
    expect(repository.findOne).toHaveBeenCalledWith(id);
  });

  it('should update an castration', async () => {
    const id = 1;
    const dto: UpdateConsumivelDto = {
      tipo_animal: 'Cão Updated',
      descricao: 'Ração',
      gasto_id: 2,
    };

    const result = await service.update(id, dto);
    expect(result).toEqual({
      id,
      ...dto,
    });
    expect(repository.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove an castration', async () => {
    const id = 1;
    const result = await service.remove(id);
    expect(result).toEqual({ id });
    expect(repository.remove).toHaveBeenCalledWith({ id });
  });
});
