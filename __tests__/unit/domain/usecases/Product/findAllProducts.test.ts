import { Prisma } from '@prisma/client';

import Product from '../../../../../src/domain/entities/Product';
import { FindAllProducts } from '../../../../../src/domain/usecases/Product/FindAllProducts';
import { ProductRepository } from '../../../../../src/infra/repositories/ProductRepository';
import { ServerError } from '../../../../../src/presentation/errors';

describe('Find All Products', () => {
  const makeSut = () => {
    const productRepository = new ProductRepository();
    return new FindAllProducts(productRepository);
  };

  const sut = makeSut();

  const returnedValue = [
    {
      id: '',
      title: '',
      description: '',
      category: '',
      price: new Prisma.Decimal(0),
      image: '',
    },
  ] as Product[];

  it('Should find all products when success', async () => {
    jest
      .spyOn(ProductRepository.prototype, 'findAll')
      .mockResolvedValue(returnedValue);

    const products = await sut.execute();

    expect(products).toEqual(returnedValue);
  });

  it('Should throw a error when failed', async () => {
    jest
      .spyOn(ProductRepository.prototype, 'findAll')
      .mockImplementation(() => {
        throw new ServerError();
      });

    expect(sut.execute()).rejects.toThrow(new ServerError());
  });
});
