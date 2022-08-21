import User from '../../../../../src/domain/entities/User';
import { SaveUser } from '../../../../../src/domain/usecases/User/SaveUser';
import { UserRepository } from '../../../../../src/infra/repositories/UserRepository';
import { ServerError } from '../../../../../src/presentation/errors';

describe('Save User', () => {
  const makeSut = () => {
    const userRepository = new UserRepository();
    return new SaveUser(userRepository);
  };

  const sut = makeSut();

  const validUser = {
    id: 'VALID ID',
    email: '',
    password: '',
    username: '',
    first_name: '',
    last_name: '',
  } as User;

  it('Should save an user when success', async () => {
    jest.spyOn(UserRepository.prototype, 'save').mockImplementation(() => {
      return Promise.resolve();
    });

    expect(sut.execute(validUser)).resolves.not.toThrow();
  });

  it('Should throw an error when failed', async () => {
    jest.spyOn(UserRepository.prototype, 'save').mockImplementation(() => {
      throw new ServerError();
    });

    expect(sut.execute(validUser)).rejects.toThrow(new ServerError());
  });
});
