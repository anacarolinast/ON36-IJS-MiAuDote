import { Test, TestingModule } from '@nestjs/testing';
import { GastosService } from './gastos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Gasto } from '../domain/gastos';
import { Repository } from 'typeorm';
import { CreateGastoDto } from '../presenters/http/dto/create-gasto.dto';
import { UpdateGastoDto } from '../presenters/http/dto/update-gasto.dto';

describe('Testando GastosService', () => {
  let service: GastosService;
  let repository: Repository<Gasto>;

  const mockGastoRepository = {
    create: jest.fn().mockImplementation((dto: CreateGastoDto) => dto),
    save: jest.fn().mockImplementation((gasto: Gasto) =>
      Promise.resolve({
        id: Date.now(),
        ...gasto,
      })
    ),
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        data_gasto: new Date(),
        tipo: 'Medicamento',
        quantidade: 1,
        valor: 123.45
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      data_gasto: new Date(),
      tipo: 'Medicamento',
      quantidade: 1,
      valor: 123.45
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      data_gasto: new Date(),
      tipo: 'Medicamento Updated',
      quantidade: 1,
      valor: 123.45
    }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
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

  it('should create a new spending', async () => {
    const dto: CreateGastoDto = {
      data_gasto: new Date(),
      tipo: 'Medicamento',
      quantidade: 1,
      valor: 123.45
    };

    const result = await service.create(dto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(dto);
  });

  it('should return an array of spendings', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: 1,
        data_gasto: new Date(),
        tipo: 'Medicamento',
        quantidade: 1,
        valor: 123.45
      },
    ]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single spending by ID', async () => {
    const id = 1;
    const result = await service.findOne(id);
    expect(result).toEqual({
      id,
      tipo_doacao: 'Medicamento',
      descricao: 'Bravecto',
      pessoa_id: 1
    });
    expect(repository.findOne).toHaveBeenCalledWith(id);
  });

  it('should update an spending', async () => {
    const id = 1;
    const dto: UpdateGastoDto = {
      data_gasto: new Date(),
      tipo: 'Medicamento',
      quantidade: 1,
      valor: 123.45
    };

    const result = await service.update(id, dto);
    expect(result).toEqual({
      id,
      ...dto,
    });
    expect(repository.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove an spending', async () => {
    const id = 1;
    const result = await service.remove(id);
    expect(result).toEqual({ id });
    expect(repository.remove).toHaveBeenCalledWith({ id });
  });
});
