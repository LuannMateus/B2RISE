import { Request, Response } from 'express';

import { Purchase } from '../../../domain/repositories/IPurchaseRepository';
import { SavePurchase } from '../../../domain/usecases/Purchase/SavePurchase';
import { ProductRepository } from '../../../infra/repositories/ProductRepository';
import { PurchaseRepository } from '../../../infra/repositories/PurchaseRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class SavePurchaseController {
  async handle(req: Request, res: Response) {
    const purchaseRepository = new PurchaseRepository();
    const productRepository = new ProductRepository();

    const savePurchaseUsecase = new SavePurchase(
      purchaseRepository,
      productRepository
    );

    const { user_id, product_id, quantity } = req.body as Purchase;

    try {
      await savePurchaseUsecase.execute({
        id: undefined,
        user_id,
        product_id,
        quantity,
      });

      return res.status(201).end();
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
