import { Prisma } from '@prisma/client';

import Product from '../../../../../src/domain/entities/Product';
import { UpdateProductById } from '../../../../../src/domain/usecases/Product/UpdateProductById';
import { ProductRepository } from '../../../../../src/infra/repositories/ProductRepository';
import { ServerError } from '../../../../../src/presentation/errors';

describe('Update Product', () => {
  const makeSut = () => {
    const productRepository = new ProductRepository();
    return new UpdateProductById(productRepository);
  };

  const sut = makeSut();

  const valueToUpdate = {
    title: 'NEW VALUE',
  } as Product;

  const validUpdatedProduct = {
    id: '',
    title: 'NEW VALUE',
    description: '',
    category: '',
    price: new Prisma.Decimal(0),
    image: '',
  } as Product;

  const mockId = 'VALID ID';

  it('Should update a product when success', async () => {
    jest
      .spyOn(ProductRepository.prototype, 'updateById')
      .mockResolvedValue(validUpdatedProduct);

    const updatedProduct = await sut.execute(mockId, valueToUpdate);

    expect(sut.execute(mockId, valueToUpdate)).resolves.not.toThrow();

    expect(updatedProduct.title).toBe(valueToUpdate.title);
  });

  it('Should throw an error when failed', async () => {
    jest
      .spyOn(ProductRepository.prototype, 'updateById')
      .mockImplementation(() => {
        throw new ServerError();
      });

    expect(sut.execute(mockId, valueToUpdate)).rejects.toThrow(
      new ServerError()
    );
  });
});
