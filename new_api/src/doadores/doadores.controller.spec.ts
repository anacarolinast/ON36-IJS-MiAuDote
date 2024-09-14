import { Test, TestingModule } from '@nestjs/testing';
import { DoadoresController } from './doadores.controller';
import { DoadoresService } from './doadores.service';

describe('DoadoresController', () => {
  let controller: DoadoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoadoresController],
      providers: [DoadoresService],
    }).compile();

    controller = module.get<DoadoresController>(DoadoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
