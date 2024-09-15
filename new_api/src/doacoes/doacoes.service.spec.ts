import { Test, TestingModule } from '@nestjs/testing';
import { DoacoesService } from './doacoes.service';
import { Doacao } from './entities/doacao.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('Testando DoacoesService', () => {
  let service: DoacoesService;
  let repository: Repository<Doacao>;

  const mockDoacaoRepository = {
    find: jest.fn().mockResolvedValue([{
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Dinheiro',
      valor_estimado: 100.00,
      gasto_id: 1,
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Dinheiro',
      valor_estimado: 100.00,
      gasto_id: 1,
    }),
    create: jest.fn().mockImplementation((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    save: jest.fn().mockImplementation((doacao) => Promise.resolve(doacao)),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoacoesService,
        {
          provide: getRepositoryToken(Doacao),
          useValue: mockDoacaoRepository,
        },
      ],
    }).compile();

    service = module.get<DoacoesService>(DoacoesService);
    repository = module.get<Repository<Doacao>>(getRepositoryToken(Doacao));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all doacoes', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Dinheiro',
      valor_estimado: 100.00,
      gasto_id: 1,
    }]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return one doacao by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Dinheiro',
      valor_estimado: 100.00,
      gasto_id: 1,
    });
    expect(repository.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new doacao', async () => {
    const createDto = {
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Dinheiro',
      valor_estimado: 100.00,
      gasto_id: 1,
    };
    const result = await service.create(createDto);
    expect(result).toEqual({
      id: expect.any(Number),
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Dinheiro',
      valor_estimado: 100.00,
      gasto_id: 1,
    });
    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should update a doacao', async () => {
    const updateDto = {
      tipo_doacao: 'Alimento',
      valor_estimado: 150.00,
    };
    const result = await service.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Alimento',
      valor_estimado: 150.00,
      gasto_id: 1,
    });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should delete a doacao', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(repository.remove).toHaveBeenCalledWith({ id: 1 });
  });
});
