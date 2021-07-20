import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

export class ColumnNumericTransformer implements ValueTransformer {
  to(data: number): number {
    return data;
  }

  from(data: string): number {
    return parseFloat(data);
  }
}
