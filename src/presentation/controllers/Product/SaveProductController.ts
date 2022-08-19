import { Request, Response } from 'express';

import Product from '../../../domain/entities/Product';
import { SaveProduct } from '../../../domain/usecases/Product/SaveProduct';
import { ProductRepository } from '../../../infra/repositories/ProductRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class SaveProductController {
  async handle(req: Request, res: Response) {
    const productRepository = new ProductRepository();
    const saveProductUsecase = new SaveProduct(productRepository);

    const { title, price, description, category, image } = req.body as Product;

    try {
      await saveProductUsecase.execute({
        id: undefined,
        title,
        price,
        description,
        category,
        image,
      });

      return res.status(201).end();
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
