import { Id } from '../id';
import { v4 as uuidv4 } from 'uuid';

describe('IdTest', () => {
  test('should create id instance', () => {
    const id = new Id(uuidv4());

    expect(id).toBeInstanceOf(Id);
  });

  test('should save value', () => {
    const value = uuidv4();

    const id = new Id(value);

    expect(id.value).toBe(value);
  });

  test('should throw exception when value is not uuid', async () => {
    expect(() => new Id('notUuid')).toThrowError('"value" must be a valid GUID');
  });
});
