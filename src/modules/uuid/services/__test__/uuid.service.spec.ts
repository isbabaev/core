import * as Joi from 'joi';
import { UuidService } from '../uuid.service';

describe('UuidServiceTest', () => {
  let uuidService: UuidService;

  beforeAll(() => {
    uuidService = new UuidService();
  });

  describe('generate', () => {
    test('should return uuid', () => {
      const uuid = uuidService.generate();

      Joi.assert(uuid, Joi.string().uuid().required());
    });
  });
});
