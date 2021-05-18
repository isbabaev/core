import { PurchaseDate } from '../purchase-date';

describe('PurchaseDateTest', () => {
  test('should create PurchaseDate instance', () => {
    const purchaseDate = new PurchaseDate(new Date());

    expect(purchaseDate).toBeInstanceOf(PurchaseDate);
  });

  test('should save value', () => {
    const value = new Date();
    const purchaseDate = new PurchaseDate(value);

    expect(purchaseDate.value).toBe(value);
  });
});
