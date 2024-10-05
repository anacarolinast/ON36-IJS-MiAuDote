import { Test, TestingModule } from '@nestjs/testing';
import { DoadoresService } from './doadores.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doador } from '../domain/doadores';
import { Repository } from 'typeorm';
import { CreateDoadorDto } from '../presenters/http/dto/create-doador.dto';
import { UpdateDoadorDto } from '../presenters/http/dto/update-doador.dto';

describe('Testando DoadoresService', () => {
  let service: DoadoresService;
  let repository: Repository<Doador>;

  const mockDoadorRepository = {
    create: jest.fn().mockImplementation((dto: CreateDoadorDto) => dto),
    save: jest.fn().mockImplementation((doador: Doador) =>
      Promise.resolve({
        id: Date.now(),
        ...doador,
      })
    ),
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        tipo_doacao: 'Medicamento',
        descricao: 'Bravecto',
        pessoa_id: 1
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      tipo_doacao: 'Medicamento',
      descricao: 'Bravecto',
      pessoa_id: 1
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      tipo_doacao: 'Medicamento',
      descricao: 'Bravecto 5-14kg',
      pessoa_id: 1
    }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
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

  it('should create a new donation', async () => {
    const dto: CreateDoadorDto = {
      tipo_doacao: 'Medicamento',
      descricao: 'Bravecto',
      pessoa_id: 1
    };

    const result = await service.create(dto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(dto);
  });

  it('should return an array of donations', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: 1,
        tipo_doacao: 'Medicamento',
        descricao: 'Bravecto',
        pessoa_id: 1
      },
    ]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single donation by ID', async () => {
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

  it('should update an donation', async () => {
    const id = 1;
    const dto: UpdateDoadorDto = {
      tipo_doacao: 'Medicamento',
      descricao: 'Bravecto 5-14kg',
      pessoa_id: 1
    };

    const result = await service.update(id, dto);
    expect(result).toEqual({
      id,
      ...dto,
    });
    expect(repository.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove an donation', async () => {
    const id = 1;
    const result = await service.remove(id);
    expect(result).toEqual({ id });
    expect(repository.remove).toHaveBeenCalledWith({ id });
  });
});
