import { Test, TestingModule } from '@nestjs/testing';
import { GastosService } from './gastos.service';
import { Gasto } from './entities/gasto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('GastosService', () => {
  let service: GastosService;
  let repository: Repository<Gasto>;

  const mockGastoRepository = {
    find: jest.fn().mockResolvedValue([{
      id: 1,
      data_gasto: new Date(),
      tipo: 'Alimento',
      quantidade: 10,
      valor: 100.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      data_gasto: new Date(),
      tipo: 'Alimento',
      quantidade: 10,
      valor: 100.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    }),
    create: jest.fn().mockImplementation((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    save: jest.fn().mockImplementation((gasto) => Promise.resolve(gasto)),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GastosService,
        {
          provide: getRepositoryToken(Gasto),
          useValue: mockGastoRepository,
        },
      ],
    }).compile();

    service = module.get<GastosService>(GastosService);
    repository = module.get<Repository<Gasto>>(getRepositoryToken(Gasto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all gastos', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{
      id: 1,
      data_gasto: new Date(),
      tipo: 'Alimento',
      quantidade: 10,
      valor: 100.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    }]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return one gasto by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      data_gasto: new Date(),
      tipo: 'Alimento',
      quantidade: 10,
      valor: 100.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    });
    expect(repository.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new gasto', async () => {
    const createDto = {
      data_gasto: new Date(),
      tipo: 'Alimento',
      quantidade: 10,
      valor: 100.00,
    };
    const result = await service.create(createDto);
    expect(result).toEqual({
      id: expect.any(Number),
      data_gasto: new Date(),
      tipo: 'Alimento',
      quantidade: 10,
      valor: 100.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    });
    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should update a gasto', async () => {
    const updateDto = {
      tipo: 'Medicamento',
      quantidade: 5,
      valor: 50.00,
    };
    const result = await service.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      data_gasto: new Date(),
      tipo: 'Medicamento',
      quantidade: 5,
      valor: 50.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should delete a gasto', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(repository.remove).toHaveBeenCalledWith({ id: 1 });
  });
});
