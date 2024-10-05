import { Test, TestingModule } from '@nestjs/testing';
import { DoacoesService } from './doacoes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doacao } from '../domain/doacoes';
import { Repository } from 'typeorm';
import { CreateDoacaoDto } from '../presenters/http/dto/create-doacao.dto';
import { UpdateDoacaoDto } from '../presenters/http/dto/update-doacao.dto';

describe('Testando DoacoesService', () => {
  let service: DoacoesService;
  let repository: Repository<Doacao>;

  const mockDoacaoRepository = {
    create: jest.fn().mockImplementation((dto: CreateDoacaoDto) => dto),
    save: jest.fn().mockImplementation((doacao: Doacao) =>
      Promise.resolve({
        id: Date.now(),
        ...doacao,
      })
    ),
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        doador_id: 1,
        data_doacao: new Date(),
        tipo_doacao: 'Ração',
        valor_estimado: -123.45,
        gasto_id: 1
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Ração',
      valor_estimado: -123.45,
      gasto_id: 1
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Dinheiro',
      valor_estimado: -123.45,
      gasto_id: 1
    }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
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

  it('should create a new donation', async () => {
    const dto: CreateDoacaoDto = {
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Ração',
      valor_estimado: -123.45,
      gasto_id: 1
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
        doador_id: 1,
        data_doacao: new Date(),
        tipo_doacao: 'Ração',
        valor_estimado: -123.45,
        gasto_id: 1
      },
    ]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single donation by ID', async () => {
    const id = 1;
    const result = await service.findOne(id);
    expect(result).toEqual({
      id,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Ração',
      valor_estimado: -123.45,
      gasto_id: 1
    });
    expect(repository.findOne).toHaveBeenCalledWith(id);
  });

  it('should update an donation', async () => {
    const id = 1;
    const dto: UpdateDoacaoDto = {
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Dinheiro',
      valor_estimado: -123.45,
      gasto_id: 1
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
