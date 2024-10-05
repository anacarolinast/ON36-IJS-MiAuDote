import { Test, TestingModule } from '@nestjs/testing';
import { AdotantesController } from './adotantes.controller';
import { AdotantesService } from '../../application/adotantes.service';
import { CreateAdotanteDto } from './dto/create-adotante.dto';
import { UpdateAdotanteDto } from './dto/update-adotante.dto';

describe('Teste para AdotantesController', () => {
  let controller: AdotantesController;
  let service: AdotantesService;

  const mockAdotantesService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto
      };
    }),
    findAll: jest.fn(() => [
      {
        id: 1,
        renda: 123.45,
        condicao_entrevista: 'Aprovado',
        pessoa_id: 1
      },
    ]),
    findOne: jest.fn((id) => ({
      id,
      renda: 123.45,
      condicao_entrevista: 'Aprovado',
      pessoa_id: 1
    })),
    update: jest.fn((id, dto) => ({
      id,
      ...dto
    })),
    remove: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdotantesController],
      providers: [
        {
          provide: AdotantesService,
          useValue: mockAdotantesService,
        },
      ],
    }).compile();

    controller = module.get<AdotantesController>(AdotantesController);
    service = module.get<AdotantesService>(AdotantesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new adopter', async () => {
    const dto: CreateAdotanteDto = {
      renda: 123.45,
      condicao_entrevista: 'Aprovado',
      pessoa_id: 1
    };
    expect(await controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });

    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return an array of adopters', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: 1,
        renda: 123.45,
        condicao_entrevista: 'Aprovado',
        pessoa_id: 1
      },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single adopter by ID', async () => {
    const id = 1;
    expect(await controller.findOne(id)).toEqual({
      id,
      renda: 123.45,
      condicao_entrevista: 'Aprovado',
      pessoa_id: 1
    });

    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should update an adopter', async () => {
    const id = 1;
    const dto: UpdateAdotanteDto = {
      renda: 123.45,
      condicao_entrevista: 'Aprovado Update',
      pessoa_id: 1
    };

    expect(await controller.update(id, dto)).toEqual({
      id,
      ...dto,
    });

    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove an adopter', async () => {
    const id = 1;
    expect(await controller.remove(id)).toEqual({ id });
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
