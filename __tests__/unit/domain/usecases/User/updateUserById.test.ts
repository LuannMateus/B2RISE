import User from '../../../../../src/domain/entities/User';
import { UpdateUserById } from '../../../../../src/domain/usecases/User/UpdateUserById';
import { UserRepository } from '../../../../../src/infra/repositories/UserRepository';
import { ServerError } from '../../../../../src/presentation/errors';

describe('Update User By Id', () => {
  const makeSut = () => {
    const userRepository = new UserRepository();
    return new UpdateUserById(userRepository);
  };

  const sut = makeSut();

  const valueToUpdate = {
    username: 'NEW USERNAME',
  } as User;

  const validUpdatedUser = {
    id: 'VALID ID',
    email: '',
    password: '',
    username: 'NEW USERNAME',
    first_name: '',
    last_name: '',
  } as User;

  const mockId = 'VALID ID';

  it('Should update a product when success', async () => {
    jest
      .spyOn(UserRepository.prototype, 'updateById')
      .mockResolvedValue(validUpdatedUser);

    const updatedProduct = await sut.execute(mockId, valueToUpdate);

    expect(sut.execute(mockId, valueToUpdate)).resolves.not.toThrow();

    expect(updatedProduct.username).toBe(valueToUpdate.username);
  });

  it('Should throw an error when failed', async () => {
    jest
      .spyOn(UserRepository.prototype, 'updateById')
      .mockImplementation(() => {
        throw new ServerError();
      });

    expect(sut.execute(mockId, valueToUpdate)).rejects.toThrow(
      new ServerError()
    );
  });
});
