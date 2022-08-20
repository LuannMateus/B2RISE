import { Request, Response } from 'express';

import { DeleteUserById } from '../../../domain/usecases/User/DeleteUserById';
import { UserRepository } from '../../../infra/repositories/UserRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class DeleteUserByIdController {
  async handle(req: Request, res: Response) {
    const userRepository = new UserRepository();
    const deleteUserByIdUsecase = new DeleteUserById(userRepository);

    const { id } = req.params as { id: string };

    try {
      await deleteUserByIdUsecase.execute(id);

      return res.status(204).end();
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
