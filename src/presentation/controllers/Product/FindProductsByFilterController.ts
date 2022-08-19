import { ProductFilterProperties } from 'domain/repositories/IProductRepository';
import { Request, Response } from 'express';

import { FindProductsByFilter } from '../../../domain/usecases/Product/FindProductsByFilter';
import { ProductRepository } from '../../../infra/repositories/ProductRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class FindProductsByFilterController {
  async handle(req: Request, res: Response) {
    const productRepository = new ProductRepository();
    const findProductByCategory = new FindProductsByFilter(productRepository);

    const { category, title } = req.query as ProductFilterProperties;

    try {
      if (!category && !title)
        throw new BadRequestError('Inform at least one filter!');

      const products = await findProductByCategory.execute({
        category,
        title,
      });

      return res.status(200).json(products);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({
          message: error,
        });
      } else if (error instanceof BadRequestError) {
        return res.status(400).json({
          message: error.message,
        });
      } else {
        return res.status(500).json({
          message: error,
        });
      }
    }
  }
}
