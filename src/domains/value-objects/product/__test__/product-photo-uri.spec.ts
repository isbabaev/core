import { ProductPhotoUri } from '../product-photo-uri';

describe('ProductPhotoUriTest', () => {
  test('should create ProductPhotoUri instance', () => {
    const value = 'https://test.com/photo';
    const productPhotoUri = new ProductPhotoUri(value);

    expect(productPhotoUri).toBeInstanceOf(ProductPhotoUri);
  });

  test('should save value', () => {
    const value = 'https://test.com/photo';
    const productPhotoUri = new ProductPhotoUri(value);

    expect(productPhotoUri.value).toBe(value);
  });

  test('should throw exception when value is not uri', async () => {
    const value = 'test.com/photo';
    expect(() => new ProductPhotoUri(value)).toThrowError('"value" must be a valid uri');
  });
});
