import { IUserRepository } from 'domain/repositories/IUserRepository';

import User from '../../../domain/entities/User';

export class SaveUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(user: User): Promise<void> {
    return await this.userRepository.save(user);
  }
}
