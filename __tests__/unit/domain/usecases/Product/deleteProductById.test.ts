import { DeleteProductById } from '../../../../../src/domain/usecases/Product/DeleteProductById';
import { ProductRepository } from '../../../../../src/infra/repositories/ProductRepository';
import { ServerError } from '../../../../../src/presentation/errors';

describe('Delete Product', () => {
  const makeSut = () => {
    const productRepository = new ProductRepository();
    return new DeleteProductById(productRepository);
  };

  const sut = makeSut();

  const mockId = 'VALID ID';

  it('Should delete a product by id when success', async () => {
    jest
      .spyOn(ProductRepository.prototype, 'deleteById')
      .mockImplementation(() => {
        return Promise.resolve();
      });

    expect(sut.execute(mockId)).resolves.not.toThrow();
  });

  it('Should throw an error when failed', async () => {
    jest
      .spyOn(ProductRepository.prototype, 'deleteById')
      .mockImplementation(() => {
        throw new ServerError();
      });

    expect(sut.execute(mockId)).rejects.toThrow(new ServerError());
  });
});
