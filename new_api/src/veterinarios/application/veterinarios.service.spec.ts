import { Test, TestingModule } from '@nestjs/testing';
import { VeterinarioRepository } from '../application/ports/veterinarios.repository';
import { VeterinariosService } from './veterinarios.service';
import { VeterinarioFactory } from '../domain/factories/veterinarios-factory';
import { CreateVeterinarioDto } from '../presenters/http/dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from '../presenters/http/dto/update-veterinario.dto';
import { Veterinario } from '../domain/veterinarios';

describe('VeterinariosService', () => {
  let service: VeterinariosService;
  let veterinarioFactory: VeterinarioFactory;
  let veterinarioRepository: VeterinarioRepository;

  const createVeterinarioDto: CreateVeterinarioDto = {
    especialidade: 'Clínico Geral',
    registro_crmv: '1234',
    pessoa_id: 1,
  };

  const updateVeterinarioDto: UpdateVeterinarioDto = {
    especialidade: 'Cirurgião',
    registro_crmv: '123456',
    pessoa_id: 1,
  };

  const veterinario = new Veterinario(
    1,
    'Clínico Geral',
    '1234',
    1,
  );

  beforeEach(async () => {
    veterinarioFactory = {
      create: jest.fn().mockImplementation((data) => {
        return new Veterinario(
          1,
          data.especialidade,
          data.registro_crmv,
          data.pessoa_id,
        );
      }),
    };

    veterinarioRepository = {
      save: jest.fn().mockResolvedValue(veterinario),
      findAll: jest.fn().mockResolvedValue([veterinario]),
      findById: jest.fn().mockResolvedValue(veterinario),
      update: jest.fn().mockResolvedValue(veterinario),
      remove: jest.fn().mockResolvedValue(undefined),
    } as unknown as VeterinarioRepository;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VeterinariosService,
        {
          provide: VeterinarioRepository,
          useValue: veterinarioRepository,
        },
        {
          provide: VeterinarioFactory,
          useValue: veterinarioFactory,
        },
      ],
    }).compile();

    service = module.get<VeterinariosService>(VeterinariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a veterinario', async () => {
    const createdVeterinario = await service.create(createVeterinarioDto);
    expect(createdVeterinario).toBeInstanceOf(Veterinario);
    expect(createdVeterinario.especialidade).toBe(createVeterinarioDto.especialidade);
    expect(veterinarioRepository.save).toHaveBeenCalledWith(expect.any(Veterinario));
  });

  it('should return all veterinarios', async () => {
    const result = await service.findAll();
    expect(result).toEqual([veterinario]);
  });

  it('should return a veterinario by id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(veterinario);
  });

  it('should update a veterinario', async () => {
    const updatedVeterinario = await service.update(1, updateVeterinarioDto);
    expect(updatedVeterinario).toBeInstanceOf(Veterinario);
    expect(updatedVeterinario.especialidade).toBe(updateVeterinarioDto.especialidade);
    expect(veterinarioRepository.update).toHaveBeenCalledWith(1, expect.any(Veterinario));
  });

  it('should remove a veterinario', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ deleted: true });
  });
});
