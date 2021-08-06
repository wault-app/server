import { Test, TestingModule } from '@nestjs/testing';
import { SessionTokenService } from './session-token.service';

describe('SessionTokenService', () => {
  let service: SessionTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionTokenService],
    }).compile();

    service = module.get<SessionTokenService>(SessionTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
