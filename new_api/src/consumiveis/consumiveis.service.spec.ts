import { Test, TestingModule } from '@nestjs/testing';
import { ConsumiveisService } from './consumiveis.service';

describe('ConsumiveisService', () => {
  let service: ConsumiveisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumiveisService],
    }).compile();

    service = module.get<ConsumiveisService>(ConsumiveisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
