import { Prisma } from '@prisma/client';

import Product from '../../../../../src/domain/entities/Product';
import { ProductFilterProperties } from '../../../../../src/domain/repositories/IProductRepository';
import { FindProductsByFilter } from '../../../../../src/domain/usecases/Product/FindProductsByFilter';
import { ProductRepository } from '../../../../../src/infra/repositories/ProductRepository';
import { BadRequestError } from '../../../../../src/presentation/errors';

describe('Find Product By Id', () => {
  const makeSut = () => {
    const productRepository = new ProductRepository();
    return new FindProductsByFilter(productRepository);
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

  const validFilter = {
    category: 'validCategory',
  } as ProductFilterProperties;

  it('Should find a product by id when success', async () => {
    jest
      .spyOn(ProductRepository.prototype, 'findManyByFilter')
      .mockResolvedValue(returnedValue);

    const product = await sut.execute(validFilter);

    expect(product).toEqual(returnedValue);
  });

  it('Should throw an error when filter is invalid', async () => {
    jest
      .spyOn(ProductRepository.prototype, 'findManyByFilter')
      .mockImplementation(() => {
        throw new BadRequestError();
      });

    const invalidFilter = {} as ProductFilterProperties;

    expect(sut.execute(invalidFilter)).rejects.toThrow(new BadRequestError());
  });
});
