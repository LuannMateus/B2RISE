import User from '../../../../../src/domain/entities/User';
import { FindUserById } from '../../../../../src/domain/usecases/User/FindUserById';
import { UserRepository } from '../../../../../src/infra/repositories/UserRepository';
import { NotFoundError } from '../../../../../src/presentation/errors';

describe('Find User By Id', () => {
  const makeSut = () => {
    const userRepository = new UserRepository();
    return new FindUserById(userRepository);
  };

  const sut = makeSut();

  const returnedValue = {
    id: 'VALID ID',
    email: '',
    password: '',
    username: '',
    first_name: '',
    last_name: '',
  } as User;

  const mockId = 'VALID ID';

  it('Should find an user by id when success', async () => {
    jest
      .spyOn(UserRepository.prototype, 'findById')
      .mockResolvedValue(returnedValue);

    const user = await sut.execute(mockId);

    expect(user).toEqual(returnedValue);
  });

  it('Should throw a error when failed', async () => {
    jest.spyOn(UserRepository.prototype, 'findById').mockImplementation(() => {
      throw new NotFoundError();
    });

    expect(sut.execute(mockId)).rejects.toThrow(new NotFoundError());
  });
});
