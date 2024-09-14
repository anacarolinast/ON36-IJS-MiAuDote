import { Test, TestingModule } from '@nestjs/testing';
import { AdocoesController } from './adocoes.controller';
import { AdocoesService } from './adocoes.service';

describe('AdocoesController', () => {
  let controller: AdocoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdocoesController],
      providers: [AdocoesService],
    }).compile();

    controller = module.get<AdocoesController>(AdocoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
