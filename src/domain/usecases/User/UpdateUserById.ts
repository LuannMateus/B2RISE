import { IUserRepository } from 'domain/repositories/IUserRepository';

import User from '../../../domain/entities/User';

export class UpdateUserById {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, user: User): Promise<User> {
    return await this.userRepository.updateById(id, user);
  }
}
