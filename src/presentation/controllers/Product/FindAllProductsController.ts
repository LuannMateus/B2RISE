import { Request, Response } from 'express';

import { FindAllProducts } from '../../../domain/usecases/Product/FindAllProducts';
import { ProductRepository } from '../../../infra/repositories/ProductRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class FindAllProductsController {
  async handle(_: Request, res: Response) {
    try {
      const productRepository = new ProductRepository();
      const findAllProductsUsecase = new FindAllProducts(productRepository);

      const products = await findAllProductsUsecase.execute();

      res.status(200).json(products);
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
