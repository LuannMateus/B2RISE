import { Request, Response } from 'express';

import { DeleteProductById } from '../../../domain/usecases/Product/DeleteProductById';
import { ProductRepository } from '../../../infra/repositories/ProductRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class DeleteProductByIdController {
  async handle(req: Request, res: Response) {
    const productRepository = new ProductRepository();
    const deleteByIdProductUsecase = new DeleteProductById(productRepository);

    const { id } = req.params as { id: string };

    try {
      await deleteByIdProductUsecase.execute(id);

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
