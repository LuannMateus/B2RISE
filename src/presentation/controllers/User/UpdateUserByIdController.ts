import { Request, Response } from 'express';

import User from '../../../domain/entities/User';
import { UpdateUserById } from '../../../domain/usecases/User/UpdateUserById';
import { UserRepository } from '../../../infra/repositories/UserRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class UpdateUserByIdController {
  async handle(req: Request, res: Response) {
    const userRepository = new UserRepository();
    const updateUserByIdUsecase = new UpdateUserById(userRepository);

    const { id } = req.params as { id: string };
    const user = req.body as User;

    if (user.id) user.id = undefined;

    try {
      const updatedProduct = await updateUserByIdUsecase.execute(id, user);

      return res.status(200).json(updatedProduct);
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
