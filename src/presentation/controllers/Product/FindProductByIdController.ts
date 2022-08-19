import { Request, Response } from 'express';

import { FindProductById } from '../../../domain/usecases/Product/FindProductById';
import { ProductRepository } from '../../../infra/repositories/ProductRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class FindProductByIdController {
  async handle(req: Request, res: Response) {
    const productRepository = new ProductRepository();
    const findProductByIdUsecase = new FindProductById(productRepository);

    const { id } = req.params as { id: string };

    try {
      const product = await findProductByIdUsecase.execute(id);

      res.status(200).json(product);
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
