import { Test, TestingModule } from '@nestjs/testing';
import { CastracoesController } from './castracoes.controller';
import { CastracoesService } from './castracoes.service';

describe('CastracoesController', () => {
  let controller: CastracoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastracoesController],
      providers: [CastracoesService],
    }).compile();

    controller = module.get<CastracoesController>(CastracoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
