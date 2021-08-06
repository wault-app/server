import { Test, TestingModule } from '@nestjs/testing';
import { RemoteAuthService } from './remote-auth.service';

describe('RemoteAuthService', () => {
  let service: RemoteAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoteAuthService],
    }).compile();

    service = module.get<RemoteAuthService>(RemoteAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
