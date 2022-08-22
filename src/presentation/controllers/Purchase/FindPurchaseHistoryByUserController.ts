import { Request, Response } from 'express';

import { PurchaseFilter } from '../../../domain/repositories/IPurchaseRepository';
import { FindPurchaseHistoryByUser } from '../../../domain/usecases/Purchase/FindPurchaseHistoryByUser';
import { PurchaseRepository } from '../../../infra/repositories/PurchaseRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class FindPurchaseHistoryByUserController {
  async handle(req: Request, res: Response) {
    const purchaseRepository = new PurchaseRepository();
    const findPurchaseHistoryByUserUsecase = new FindPurchaseHistoryByUser(
      purchaseRepository
    );

    const { id: userId } = req.params as { id: string };

    const { category, title } = Object.create(
      req.query
    ) as PurchaseFilter;

    try {
      const purchases = await findPurchaseHistoryByUserUsecase.execute(userId, {
        category,
        title,
      });

      return res.status(200).json(purchases);
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
