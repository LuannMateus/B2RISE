import { DeleteUserById } from '../../../../../src/domain/usecases/User/DeleteUserById';
import { UserRepository } from '../../../../../src/infra/repositories/UserRepository';
import { ServerError } from '../../../../../src/presentation/errors';

describe('Delete User By Id', () => {
  const makeSut = () => {
    const productRepository = new UserRepository();
    return new DeleteUserById(productRepository);
  };

  const sut = makeSut();

  const mockId = 'VALID ID';

  it('Should delete an user by id when success', async () => {
    jest
      .spyOn(UserRepository.prototype, 'deleteById')
      .mockImplementation(() => {
        return Promise.resolve();
      });

    expect(sut.execute(mockId)).resolves.not.toThrow();
  });

  it('Should throw an error when failed', async () => {
    jest
      .spyOn(UserRepository.prototype, 'deleteById')
      .mockImplementation(() => {
        throw new ServerError();
      });

    expect(sut.execute(mockId)).rejects.toThrow(new ServerError());
  });
});
