import { CreatedAt } from '../created-at';

describe('CreatedAtTest', () => {
  test('should create CreatedAt instance', () => {
    const createdAt = new CreatedAt(new Date());

    expect(createdAt).toBeInstanceOf(CreatedAt);
  });

  test('should save value', () => {
    const value = new Date();
    const createdAt = new CreatedAt(value);

    expect(createdAt.value).toBe(value);
  });
});
