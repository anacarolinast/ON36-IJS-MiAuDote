import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentosService } from './medicamentos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medicamento } from '../domain/medicamentos';
import { Repository } from 'typeorm';
import { CreateMedicamentoDto } from '../presenters/http/dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from '../presenters/http/dto/update-medicamento.dto';

describe('Testando MedicamentosService', () => {
  let service: MedicamentosService;
  let repository: Repository<Medicamento>;

  const mockMedicamentoRepository = {
    create: jest.fn().mockImplementation((dto: CreateMedicamentoDto) => dto),
    save: jest.fn().mockImplementation((medicamento: Medicamento) =>
      Promise.resolve({
        id: Date.now(),
        ...medicamento,
      })
    ),
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        animal_id: 1,
        data_compra: new Date(),
        descricao: 'Bravecto',
        veterinario_id: 1,
        gasto_id: 1
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Bravecto',
      veterinario_id: 1,
      gasto_id: 1
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Bravecto Updated',
      veterinario_id: 1,
      gasto_id: 1
    }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
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

  it('should create a new spending', async () => {
    const dto: CreateMedicamentoDto = {
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Bravecto',
      veterinario_id: 1,
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

  it('should return an array of spendings', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: 1,
        animal_id: 1,
        data_compra: new Date(),
        descricao: 'Bravecto',
        veterinario_id: 1,
        gasto_id: 1
      },
    ]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single spending by ID', async () => {
    const id = 1;
    const result = await service.findOne(id);
    expect(result).toEqual({
      id,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Bravecto',
      veterinario_id: 1,
      gasto_id: 1
    });
    expect(repository.findOne).toHaveBeenCalledWith(id);
  });

  it('should update an spending', async () => {
    const id = 1;
    const dto: UpdateMedicamentoDto = {
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Bravecto',
      veterinario_id: 1,
      gasto_id: 1
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
