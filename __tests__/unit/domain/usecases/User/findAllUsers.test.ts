import User from '../../../../../src/domain/entities/User';
import { FindAllUsers } from '../../../../../src/domain/usecases/User/FindAllUsers';
import { UserRepository } from '../../../../../src/infra/repositories/UserRepository';
import { ServerError } from '../../../../../src/presentation/errors';

describe('Find All Users', () => {
  const makeSut = () => {
    const userRepository = new UserRepository();
    return new FindAllUsers(userRepository);
  };

  const sut = makeSut();

  const returnedValue = [
    {
      id: 'VALID ID',
      email: '',
      password: '',
      username: '',
      first_name: '',
      last_name: '',
    },
  ] as User[];

  it('Should find all users when success', async () => {
    jest
      .spyOn(UserRepository.prototype, 'findAll')
      .mockResolvedValue(returnedValue);

    const users = await sut.execute();

    expect(users).toEqual(returnedValue);
  });

  it('Should throw a error when failed', async () => {
    jest.spyOn(UserRepository.prototype, 'findAll').mockImplementation(() => {
      throw new ServerError();
    });

    expect(sut.execute()).rejects.toThrow(new ServerError());
  });
});
