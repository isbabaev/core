import { AccountEntity } from "../../account.entity";
import * as faker from 'faker';

export function createAccountEntity(): AccountEntity {
    return new AccountEntity(
        faker.datatype.uuid(),
        faker.name.firstName(),
        faker.name.lastName(),
        faker.internet.email(),
        faker.internet.password(),
        faker.datatype.datetime(),
        faker.datatype.datetime(),
    );
}