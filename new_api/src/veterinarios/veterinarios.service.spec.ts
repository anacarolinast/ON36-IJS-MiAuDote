import { Test, TestingModule } from '@nestjs/testing';
import { VeterinariosService } from './veterinarios.service';
import { Veterinario } from './entities/veterinario.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('VeterinariosService', () => {
  let service: VeterinariosService;
  let repository: Repository<Veterinario>;

  const mockVeterinarioRepository = {
    find: jest.fn().mockResolvedValue([{
      id: 1,
      especialidade: 'Cirurgião',
      registro_crmv: '123456',
      pessoa_id: 1,
      pessoa: null,
      vacinas: [],
      medicamentos: [],
      castracoes: [],
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      especialidade: 'Cirurgião',
      registro_crmv: '123456',
      pessoa_id: 1,
      pessoa: null,
      vacinas: [],
      medicamentos: [],
      castracoes: [],
    }),
    create: jest.fn().mockImplementation((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    save: jest.fn().mockImplementation((veterinario) => Promise.resolve(veterinario)),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VeterinariosService,
        {
          provide: getRepositoryToken(Veterinario),
          useValue: mockVeterinarioRepository,
        },
      ],
    }).compile();

    service = module.get<VeterinariosService>(VeterinariosService);
    repository = module.get<Repository<Veterinario>>(getRepositoryToken(Veterinario));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all veterinarios', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{
      id: 1,
      especialidade: 'Cirurgião',
      registro_crmv: '123456',
      pessoa_id: 1,
      pessoa: null,
      vacinas: [],
      medicamentos: [],
      castracoes: [],
    }]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return one veterinario by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      especialidade: 'Cirurgião',
      registro_crmv: '123456',
      pessoa_id: 1,
      pessoa: null,
      vacinas: [],
      medicamentos: [],
      castracoes: [],
    });
    expect(repository.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new veterinario', async () => {
    const createDto = {
      especialidade: 'Cirurgião',
      registro_crmv: '123456',
      pessoa_id: 1,
    };
    const result = await service.create(createDto);
    expect(result).toEqual({
      id: expect.any(Number),
      especialidade: 'Cirurgião',
      registro_crmv: '123456',
      pessoa_id: 1,
      pessoa: null,
      vacinas: [],
      medicamentos: [],
      castracoes: [],
    });
    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should update a veterinario', async () => {
    const updateDto = {
      especialidade: 'Dermatologista',
    };
    const result = await service.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      especialidade: 'Dermatologista',
      registro_crmv: '123456',
      pessoa_id: 1,
      pessoa: null,
      vacinas: [],
      medicamentos: [],
      castracoes: [],
    });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should delete a veterinario', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(repository.remove).toHaveBeenCalledWith({ id: 1 });
  });
});
