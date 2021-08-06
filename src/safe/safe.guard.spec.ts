import { SafeGuard } from './safe.guard';

describe('KeycardGuard', () => {
  it('should be defined', () => {
    expect(new SafeGuard()).toBeDefined();
  });
});
