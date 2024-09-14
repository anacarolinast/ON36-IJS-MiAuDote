import { Test, TestingModule } from '@nestjs/testing';
import { AdotanteController } from './adotante.controller';
import { AdotanteService } from './adotante.service';

describe('AdotanteController', () => {
  let controller: AdotanteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdotanteController],
      providers: [AdotanteService],
    }).compile();

    controller = module.get<AdotanteController>(AdotanteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
