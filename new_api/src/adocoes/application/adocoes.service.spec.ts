import { Test, TestingModule } from '@nestjs/testing';
import { AdocoesService } from './adocoes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Adocao } from '../domain/adocao';
import { Repository } from 'typeorm';
import { CreateAdocaoDto } from '../presenters/http/dto/create-adocao.dto';
import { UpdateAdocaoDto } from '../presenters/http/dto/update-adocao.dto';

describe('Testando AdocoesService', () => {
  let service: AdocoesService;
  let repository: Repository<Adocao>;

  const mockAdocaoRepository = {
    create: jest.fn().mockImplementation((dto: CreateAdocaoDto) => dto),
    save: jest.fn().mockImplementation((adocao: Adocao) =>
      Promise.resolve({
        id: Date.now(),
        ...adocao,
      })
    ),
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        adotante_id: 1,
        animal_id: 1,
        data_adocao: new Date(),
        condicoes_especiais: 'Nenhuma',
        status_aprovacao: 'Aprovada',
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      adotante_id: 1,
      animal_id: 1,
      data_adocao: new Date(),
      condicoes_especiais: 'Nenhuma',
      status_aprovacao: 'Aprovada',
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      adotante_id: 2,
      animal_id: 2,
      data_adocao: new Date(),
      condicoes_especiais: 'Precisa de cuidado especial',
      status_aprovacao: 'Aprovada',
    }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdocoesService,
        {
          provide: getRepositoryToken(Adocao),
          useValue: mockAdocaoRepository,
        },
      ],
    }).compile();

    service = module.get<AdocoesService>(AdocoesService);
    repository = module.get<Repository<Adocao>>(getRepositoryToken(Adocao));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new adoption', async () => {
    const dto: CreateAdocaoDto = {
      adotante_id: 1,
      animal_id: 1,
      data_adocao: new Date(),
      condicoes_especiais: 'Nenhuma',
      status_aprovacao: 'Pendente',
    };

    const result = await service.create(dto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(dto);
  });

  it('should return an array of adoptions', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: 1,
        adotante_id: 1,
        animal_id: 1,
        data_adocao: expect.any(Date),
        condicoes_especiais: 'Nenhuma',
        status_aprovacao: 'Aprovada',
      },
    ]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single adoption by ID', async () => {
    const id = 1;
    const result = await service.findOne(id);
    expect(result).toEqual({
      id,
      adotante_id: 1,
      animal_id: 1,
      data_adocao: expect.any(Date),
      condicoes_especiais: 'Nenhuma',
      status_aprovacao: 'Aprovada',
    });
    expect(repository.findOne).toHaveBeenCalledWith(id);
  });

  it('should update an adoption', async () => {
    const id = 1;
    const dto: UpdateAdocaoDto = {
      adotante_id: 2,
      animal_id: 2,
      data_adocao: new Date(),
      condicoes_especiais: 'Precisa de cuidado especial',
      status_aprovacao: 'Aprovada',
    };

    const result = await service.update(id, dto);
    expect(result).toEqual({
      id,
      ...dto,
    });
    expect(repository.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove an adoption', async () => {
    const id = 1;
    const result = await service.remove(id);
    expect(result).toEqual({ id });
    expect(repository.remove).toHaveBeenCalledWith({ id });
  });
});
