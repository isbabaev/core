import { AccountEntity } from "../../account.entity";
import { datatype, name, internet } from 'faker';

export function createAccountEntity(): AccountEntity {
    return new AccountEntity(
        datatype.uuid(),
        name.firstName(),
        name.lastName(),
        internet.email(),
        internet.password(),
        datatype.datetime(),
        datatype.datetime(),
    );
}