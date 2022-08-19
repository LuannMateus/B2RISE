import { ProductFilterProperties } from 'domain/repositories/IProductRepository';
import { Request, Response } from 'express';

import { FindProductsByFilter } from '../../../domain/usecases/Product/FindProductsByFilter';
import { ProductRepository } from '../../../infra/repositories/ProductRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class FindProductsByFilterController {
  async handle(req: Request, res: Response) {
    const productRepository = new ProductRepository();
    const findProductByCategory = new FindProductsByFilter(productRepository);

    const { category, title, page, limit } = Object.create(
      req.query
    ) as ProductFilterProperties;

    try {
      if (page !== null && page !== undefined)
        if (page <= 0) throw new BadRequestError('Page filter is invalid');

      if (limit !== null && limit !== undefined)
        if (limit < 0) throw new BadRequestError('Limit filter is invalid');

      const products = await findProductByCategory.execute({
        category,
        title,
        limit,
        page,
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
