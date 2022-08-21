import { Prisma } from '@prisma/client';

import Product from '../../../../../src/domain/entities/Product';
import { FindProductById } from '../../../../../src/domain/usecases/Product/FindProductById';
import { ProductRepository } from '../../../../../src/infra/repositories/ProductRepository';
import { BadRequestError } from '../../../../../src/presentation/errors';

describe('Find Product By Id', () => {
  const makeSut = () => {
    const productRepository = new ProductRepository();
    return new FindProductById(productRepository);
  };

  const sut = makeSut();

  const returnedValue = {
    id: '',
    title: '',
    description: '',
    category: '',
    price: new Prisma.Decimal(0),
    image: '',
  } as Product;

  const mockedId = 'VALID ID';

  it('Should find a product by id when success', async () => {
    jest
      .spyOn(ProductRepository.prototype, 'findById')
      .mockResolvedValue(returnedValue);

    const product = await sut.execute(mockedId);

    expect(product).toEqual(returnedValue);
  });

  it('Should throw an error when BadRequest', async () => {
    jest
      .spyOn(ProductRepository.prototype, 'findById')
      .mockImplementation(() => {
        throw new BadRequestError();
      });

    expect(sut.execute(mockedId)).rejects.toThrow(new BadRequestError());
  });
});
