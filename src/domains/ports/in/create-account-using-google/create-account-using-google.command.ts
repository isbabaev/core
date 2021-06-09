export class CreateAccountUsingGoogleCommand {
  private _code: string;

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  constructor(code: string) {
    this.code = code;
  }
}
