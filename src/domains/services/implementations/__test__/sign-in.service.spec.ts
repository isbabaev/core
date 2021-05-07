import { SignInService } from '../sign-in.service';
import { DomainsModule } from '../../../domains.module';
import { Test } from '@nestjs/testing';

describe('SignInServiceTest', () => {
  let signInService: SignInService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DomainsModule]
    }).compile();

    signInService = moduleRef.get<SignInService>(SignInService);
  });

  // it('should ')
})
