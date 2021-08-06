import { SessionTokenGuard } from './session-token.guard';

describe('SessionTokenGuard', () => {
  it('should be defined', () => {
    expect(new SessionTokenGuard()).toBeDefined();
  });
});
