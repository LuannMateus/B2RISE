import User from '../../domain/entities/User';

export interface IUserRepository {
  findAll(): Promise<User[]>;

  //  findManyByFilter(filter: UserFilterProperties): Promise<User[]>;

  findById(id: string): Promise<User>;

  save(user: User): Promise<void>;

  updateById(id: string, user: User): Promise<User>;

  deleteById(id: string): Promise<void>;
}
