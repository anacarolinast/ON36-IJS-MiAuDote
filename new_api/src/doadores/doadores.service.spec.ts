import { Test, TestingModule } from '@nestjs/testing';
import { DoadoresService } from './doadores.service';
import { Doador } from './entities/doador.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('DoadoresService', () => {
  let service: DoadoresService;
  let repository: Repository<Doador>;

  const mockDoadorRepository = {
    find: jest.fn().mockResolvedValue([{
      id: 1,
      tipo_adocao: 'Adote',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      tipo_adocao: 'Adote',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    }),
    create: jest.fn().mockImplementation((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    save: jest.fn().mockImplementation((doador) => Promise.resolve(doador)),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoadoresService,
        {
          provide: getRepositoryToken(Doador),
          useValue: mockDoadorRepository,
        },
      ],
    }).compile();

    service = module.get<DoadoresService>(DoadoresService);
    repository = module.get<Repository<Doador>>(getRepositoryToken(Doador));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all doadores', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{
      id: 1,
      tipo_adocao: 'Adote',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    }]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return one doador by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      tipo_adocao: 'Adote',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    });
    expect(repository.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new doador', async () => {
    const createDto = {
      tipo_adocao: 'Adote',
      pessoa_id: 1,
    };
    const result = await service.create(createDto);
    expect(result).toEqual({
      id: expect.any(Number),
      tipo_adocao: 'Adote',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    });
    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should update a doador', async () => {
    const updateDto = {
      tipo_adocao: 'Apoie',
    };
    const result = await service.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      tipo_adocao: 'Apoie',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should delete a doador', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(repository.remove).toHaveBeenCalledWith({ id: 1 });
  });
});
