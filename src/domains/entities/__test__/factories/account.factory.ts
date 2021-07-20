import { AccountEmail } from "../../../../domains/value-objects/account/account-email";
import { AccountFirstName } from "../../../../domains/value-objects/account/account-first-name";
import { AccountLastName } from "../../../../domains/value-objects/account/account-last-name";
import { AccountPassword } from "../../../../domains/value-objects/account/account-password";
import { AccountRole } from "../../../../domains/value-objects/account/account-role";
import { Id } from "../../../../domains/value-objects/id";
import { Account } from "../../account";
import { datatype, name, internet } from 'faker';

export function createAccount(): Account {
    return new Account(
        new Id(datatype.uuid()),
        new AccountFirstName(name.firstName()),
        new AccountLastName(name.lastName()),
        new AccountEmail(internet.email()),
        new AccountPassword(internet.password()),
        new AccountRole('user'),
    );
}