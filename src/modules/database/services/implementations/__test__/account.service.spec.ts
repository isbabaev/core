import { AccountService } from '../account.service';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../../database.module';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { IAccount } from '../../../interfaces/account.interface';

describe('AccountServiceTest', () => {
  let accountService: AccountService;
  let clientProxy: ClientProxy;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule]
    }).compile();

    clientProxy = moduleRef.get<ClientProxy>('DATABASE_SERVICE');

    accountService = new AccountService(clientProxy);
  });

  describe('create', () => {
    beforeAll(() => {
      jest.spyOn(clientProxy, 'send')
        .mockImplementation(() => new Observable(observer => {
          observer.next({id: 0});
          observer.complete();
        }));
    });

    it('should return id', async () => {
      const createAccountResult = await accountService.create(null);

      expect(typeof createAccountResult.id).toBe('number');
    });
  });

  describe('findByEmail', () => {
    let mockedAccount: IAccount;

    beforeAll(() => {
      mockedAccount = {
        id: 1,
        firstName: 'test',
        lastName: 'test',
        email: 'test@mail.com',
        password: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [],
      };

      jest.spyOn(clientProxy, 'send')
        .mockImplementation(() => new Observable<IAccount>(observer => {
          observer.next(mockedAccount);
          observer.complete();
        }));
    });

    it('should return account', async () => {
      const findByEmailResult = await accountService.findByEmail(null);

      expect(findByEmailResult.id).toBe(mockedAccount.id);
      expect(findByEmailResult.firstName).toBe(mockedAccount.firstName);
      expect(findByEmailResult.lastName).toBe(mockedAccount.firstName);
      expect(findByEmailResult.email).toBe(mockedAccount.email);
      expect(findByEmailResult.password).toBe(mockedAccount.password);
      expect(findByEmailResult.createdAt).toEqual(mockedAccount.createdAt);
      expect(findByEmailResult.updatedAt).toEqual(mockedAccount.updatedAt);
      expect(findByEmailResult.products).toEqual(mockedAccount.products);
    });
  });
});
