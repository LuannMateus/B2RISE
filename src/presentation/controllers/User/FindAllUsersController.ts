import { Request, Response } from 'express';

import { FindAllUsers } from '../../../domain/usecases/User/FindAllUsers';
import { UserRepository } from '../../../infra/repositories/UserRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class FindAllUsersController {
  async handle(_: Request, res: Response) {
    const userRepository = new UserRepository();
    const findAllUsersUsecase = new FindAllUsers(userRepository);

    try {
      const users = await findAllUsersUsecase.execute();

      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({
          message: error,
        });
      } else if (error instanceof BadRequestError) {
        return res.status(400).json({
          message: error,
        });
      } else {
        return res.status(500).json({
          message: error,
        });
      }
    }
  }
}
