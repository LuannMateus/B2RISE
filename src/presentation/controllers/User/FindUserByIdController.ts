import { Request, Response } from 'express';

import { FindUserById } from '../../../domain/usecases/User/FindUserById';
import { UserRepository } from '../../../infra/repositories/UserRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class FindUserByIdController {
  async handle(req: Request, res: Response) {
    const userRepository = new UserRepository();
    const findUserByIdUsecase = new FindUserById(userRepository);

    const { id } = req.params as { id: string };

    try {
      const user = await findUserByIdUsecase.execute(id);

      return res.status(200).json(user);
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
