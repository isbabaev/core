export class BaseValueObject<T> {
  private readonly _value: T;

  constructor(newValue: T) {
    this._value = newValue;
  }

  get value(): T {
    return this._value;
  }
}
