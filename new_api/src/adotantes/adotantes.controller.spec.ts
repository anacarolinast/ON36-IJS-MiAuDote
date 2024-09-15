import { Test, TestingModule } from '@nestjs/testing';
import { AdotantesController } from './adotantes.controller';
import { AdotantesService } from './adotantes.service';
import { CreateAdotanteDto } from './dto/create-adotante.dto';

describe('AdotantesController', () => {
  let controller: AdotantesController;
  let service: AdotantesService;

  const mockAdotantesService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, renda: 3000, condicao_entrevista: 'aprovado', pessoa_id: 2 }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, renda: 3000, condicao_entrevista: 'aprovado', pessoa_id: 2 }),
    create: jest.fn().mockResolvedValue({ id: 1, ...new CreateAdotanteDto() }),
    update: jest.fn().mockResolvedValue({ id: 1, renda: 4000 }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
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

  it('should return all adotantes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, renda: 3000, condicao_entrevista: 'aprovado', pessoa_id: 2 }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one adotante', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({ id: 1, renda: 3000, condicao_entrevista: 'aprovado', pessoa_id: 2 });
    expect(service.findOne).toHaveBeenCalledWith(1); // Verifica se o método foi chamado com o ID correto
  });

  it('should create a new adotante', async () => {
    const dto: CreateAdotanteDto = { renda: 2500, condicao_entrevista: 'pendente', pessoa_id: 1 };
    const result = await controller.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should update an adotante', async () => {
    const dto = { renda: 4000 };
    const result = await controller.update(1, dto);
    expect(result).toEqual({ id: 1, renda: 4000 });
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should remove an adotante', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
