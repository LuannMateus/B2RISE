import { IUserRepository } from 'domain/repositories/IUserRepository';

export class DeleteUserById {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    return await this.userRepository.deleteById(id);
  }
}
