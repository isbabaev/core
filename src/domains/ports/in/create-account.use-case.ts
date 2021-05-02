export interface CreateAccountUseCase {
  createAccount(command: CreateAccountCommand): Promise<CreateAccountResult>;
}

export interface CreateAccountCommand {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateAccountResult {
  id: number;
}
