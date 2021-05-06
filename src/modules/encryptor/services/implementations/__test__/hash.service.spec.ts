import { HashService } from '../hash.service';

describe('HashServiceTest', () => {
  let hashService: HashService;

  beforeAll(() => {
    hashService = new HashService();
  });

  describe('compare', () => {
    it('hash and data should be equal', () => {
      const data = 'test';
      const dataHash = '$2b$10$Rwj89niQpifouIv25srJC.70xoov1f3FvnjbXEVsW9rVjkH78Y6Nu';

      const areEqual = hashService.compare(data, dataHash);

      expect(areEqual).toBeTruthy();
    });
  });

  describe('hash', () => {
    it('hash should be string', async () => {
      const password = 'supperpass';
      const passwordHash = await hashService.hash(password);

      expect(typeof passwordHash).toBe('string')
    });

    it('hash should be equal with password', async () => {
      const password = 'supperpass';
      const passwordHash = await hashService.hash(password);

      const areEqual = hashService.compare(password, passwordHash)

      expect(areEqual).toBeTruthy();
    });
  });
});
