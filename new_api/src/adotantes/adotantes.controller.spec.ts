import { Test, TestingModule } from '@nestjs/testing';
import { AdotantesController } from './adotantes.controller';
import { AdotantesService } from './adotantes.service';

describe('AdotantesController', () => {
  let controller: AdotantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdotantesController],
      providers: [AdotantesService],
    }).compile();

    controller = module.get<AdotantesController>(AdotantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
