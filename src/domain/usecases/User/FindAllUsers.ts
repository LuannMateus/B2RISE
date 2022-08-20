import { IUserRepository } from 'domain/repositories/IUserRepository';

import User from '../../../domain/entities/User';

export class FindAllUsers {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
