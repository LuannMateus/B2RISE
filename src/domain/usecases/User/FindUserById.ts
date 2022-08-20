import { IUserRepository } from 'domain/repositories/IUserRepository';

import User from '../../../domain/entities/User';

export class FindUserById {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }
}
