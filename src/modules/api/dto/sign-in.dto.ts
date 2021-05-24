import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
