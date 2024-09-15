import { Test, TestingModule } from '@nestjs/testing';
import { VeterinariosController } from './veterinarios.controller';
import { VeterinariosService } from './veterinarios.service';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';

describe('VeterinariosController', () => {
  let controller: VeterinariosController;
  let service: VeterinariosService;

  const mockVeterinariosService = {
    findAll: jest.fn().mockResolvedValue([{
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
    create: jest.fn().mockResolvedValue({
      id: 1,
      especialidade: 'Cirurgião',
      registro_crmv: '123456',
      pessoa_id: 1,
      pessoa: null,
      vacinas: [],
      medicamentos: [],
      castracoes: [],
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      especialidade: 'Dermatologista',
      registro_crmv: '123456',
      pessoa_id: 1,
      pessoa: null,
      vacinas: [],
      medicamentos: [],
      castracoes: [],
    }),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeterinariosController],
      providers: [
        {
          provide: VeterinariosService,
          useValue: mockVeterinariosService,
        },
      ],
    }).compile();

    controller = module.get<VeterinariosController>(VeterinariosController);
    service = module.get<VeterinariosService>(VeterinariosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all veterinarios', async () => {
    const result = await controller.findAll();
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
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one veterinario by ID', async () => {
    const result = await controller.findOne(1);
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
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new veterinario', async () => {
    const createDto: CreateVeterinarioDto = {
      especialidade: 'Cirurgião',
      registro_crmv: '123456',
      pessoa_id: 1,
    };
    const result = await controller.create(createDto);
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
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should update a veterinario', async () => {
    const updateDto: UpdateVeterinarioDto = {
      especialidade: 'Dermatologista',
    };
    const result = await controller.update(1, updateDto);
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
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should delete a veterinario', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
