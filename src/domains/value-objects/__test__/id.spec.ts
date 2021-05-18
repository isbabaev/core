import { Id } from '../id';

describe('IdTest', () => {
  test('should create id instance', () => {
    const id = new Id(1);

    expect(id).toBeInstanceOf(Id);
  });

  test('should save value', () => {
    const value = 1;
    const id = new Id(value);

    expect(id.value).toBe(value);
  });

  test('should throw exception when value is less than 1', async () => {
    expect(() => new Id(0)).toThrowError('"value" must be greater than or equal to 1');
  });
});
