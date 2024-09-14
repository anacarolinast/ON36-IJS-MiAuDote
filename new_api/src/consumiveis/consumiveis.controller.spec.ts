import { Test, TestingModule } from '@nestjs/testing';
import { ConsumiveisController } from './consumiveis.controller';
import { ConsumiveisService } from './consumiveis.service';

describe('ConsumiveisController', () => {
  let controller: ConsumiveisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumiveisController],
      providers: [ConsumiveisService],
    }).compile();

    controller = module.get<ConsumiveisController>(ConsumiveisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
