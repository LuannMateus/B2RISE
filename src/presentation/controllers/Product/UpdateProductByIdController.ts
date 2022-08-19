import { Request, Response } from 'express';

import Product from '../../../domain/entities/Product';
import { UpdateProductById } from '../../../domain/usecases/Product/UpdateProductById';
import { ProductRepository } from '../../../infra/repositories/ProductRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class UpdateProductByIdController {
  async handle(req: Request, res: Response) {
    const productRepository = new ProductRepository();
    const updateProductByIdUsecase = new UpdateProductById(productRepository);

    const { id } = req.params as { id: string };
    const product = req.body as Product;

    if (product.id) {
      product.id = undefined;
    }

    try {
      const updatedProduct = await updateProductByIdUsecase.execute(
        id,
        product
      );

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
