import { Test, TestingModule } from '@nestjs/testing';
import { AdocoesService } from './adocoes.service';

describe('AdocoesService', () => {
  let service: AdocoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdocoesService],
    }).compile();

    service = module.get<AdocoesService>(AdocoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
