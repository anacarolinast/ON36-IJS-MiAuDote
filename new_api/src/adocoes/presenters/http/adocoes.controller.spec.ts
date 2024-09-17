import { Test, TestingModule } from '@nestjs/testing';
import { AdocoesController } from './adocoes.controller';
import { AdocoesService } from '../../application/adocoes.service';
import { CreateAdocaoDto } from './dto/create-adocao.dto';
import { UpdateAdocaoDto } from './dto/update-adocao.dto';

describe('Teste para AdocoesController', () => {
  let controller: AdocoesController;
  let service: AdocoesService;

  const mockAdocoesService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
        data_adocao: dto.data_adocao || new Date(),
      };
    }),
    findAll: jest.fn(() => [
      {
        id: 1,
        adotante_id: 1,
        animal_id: 1,
        data_adocao: new Date(),
        condicoes_especiais: 'Nenhuma',
        status_aprovacao: 'Aprovada',
      },
    ]),
    findOne: jest.fn((id) => ({
      id,
      adotante_id: 1,
      animal_id: 1,
      data_adocao: new Date(),
      condicoes_especiais: 'Nenhuma',
      status_aprovacao: 'Aprovada',
    })),
    update: jest.fn((id, dto) => ({
      id,
      ...dto,
      data_adocao: dto.data_adocao || new Date(),
    })),
    remove: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdocoesController],
      providers: [
        {
          provide: AdocoesService,
          useValue: mockAdocoesService,
        },
      ],
    }).compile();

    controller = module.get<AdocoesController>(AdocoesController);
    service = module.get<AdocoesService>(AdocoesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new adoption', async () => {
    const dto: CreateAdocaoDto = {
      adotante_id: 1,
      animal_id: 1,
      data_adocao: new Date(),
      condicoes_especiais: 'Nenhuma',
      status_aprovacao: 'Pendente',
    };
    expect(await controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });

    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return an array of adoptions', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: 1,
        adotante_id: 1,
        animal_id: 1,
        data_adocao: expect.any(Date),
        condicoes_especiais: 'Nenhuma',
        status_aprovacao: 'Aprovada',
      },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single adoption by ID', async () => {
    const id = 1;
    expect(await controller.findOne(id)).toEqual({
      id,
      adotante_id: 1,
      animal_id: 1,
      data_adocao: expect.any(Date),
      condicoes_especiais: 'Nenhuma',
      status_aprovacao: 'Aprovada',
    });

    expect(service.findOne).toHaveBeenCalledWith(id);
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

    expect(await controller.update(id, dto)).toEqual({
      id,
      ...dto,
    });

    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove an adoption', async () => {
    const id = 1;
    expect(await controller.remove(id)).toEqual({ id });
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
