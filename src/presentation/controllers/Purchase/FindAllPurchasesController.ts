import { Request, Response } from 'express';

import { FindAllPurchases } from '../../../domain/usecases/Purchase/FindAllPurchases';
import { PurchaseRepository } from '../../../infra/repositories/PurchaseRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class FindAllPurchasesController {
  async handle(_: Request, res: Response) {
    try {
      const purchaseRepository = new PurchaseRepository();
      const findAllPurchasesUsecase = new FindAllPurchases(purchaseRepository);

      const purchases = await findAllPurchasesUsecase.execute();

      res.status(200).json(purchases);
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
