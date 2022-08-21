import { Prisma } from '@prisma/client';

import Product from '../../../../../src/domain/entities/Product';
import { SaveProduct } from '../../../../../src/domain/usecases/Product/SaveProduct';
import { ProductRepository } from '../../../../../src/infra/repositories/ProductRepository';
import { ServerError } from '../../../../../src/presentation/errors';

describe('Save Product', () => {
  const makeSut = () => {
    const productRepository = new ProductRepository();
    return new SaveProduct(productRepository);
  };

  const sut = makeSut();

  const validProduct = {
    id: '',
    title: '',
    description: '',
    category: '',
    price: new Prisma.Decimal(0),
    image: '',
  } as Product;

  it('Should save a product when success', async () => {
    jest.spyOn(ProductRepository.prototype, 'save').mockImplementation(() => {
      return Promise.resolve();
    });

    expect(sut.execute(validProduct)).resolves.not.toThrow();
  });

  it('Should throw an error when failed', async () => {
    jest.spyOn(ProductRepository.prototype, 'save').mockImplementation(() => {
      throw new ServerError();
    });

    expect(sut.execute(validProduct)).rejects.toThrow(new ServerError());
  });
});
