import { Test, TestingModule } from '@nestjs/testing';
import { CastracoesService } from './castracoes.service';

describe('CastracoesService', () => {
  let service: CastracoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CastracoesService],
    }).compile();

    service = module.get<CastracoesService>(CastracoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
