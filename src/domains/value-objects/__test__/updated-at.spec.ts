import { UpdatedAt } from '../updated-at';

describe('UpdatedAtTest', () => {
  test('should create UpdatedAt instance', () => {
    const updatedAt = new UpdatedAt(new Date());

    expect(updatedAt).toBeInstanceOf(UpdatedAt);
  });

  test('should save value', () => {
    const value = new Date();
    const updatedAt = new UpdatedAt(value);

    expect(updatedAt.value).toBe(value);
  });
});
