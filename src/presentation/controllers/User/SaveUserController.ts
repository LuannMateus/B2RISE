import { Request, Response } from 'express';

import User from '../../../domain/entities/User';
import { SaveUser } from '../../../domain/usecases/User/SaveUser';
import { UserRepository } from '../../../infra/repositories/UserRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class SaveUserController {
  async handle(req: Request, res: Response) {
    const userRepository = new UserRepository();
    const saveUserUsecase = new SaveUser(userRepository);

    const { email, username, password, first_name, last_name } =
      req.body as User;

    try {
      await saveUserUsecase.execute({
        id: undefined,
        email,
        username,
        password,
        first_name,
        last_name,
      });

      return res.status(200).end();
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
