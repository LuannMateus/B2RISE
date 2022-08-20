import { Request, Response } from 'express';

import { FindPurchaseHistory } from '../../../domain/usecases/Purchase/FindPurchaseHistory';
import { PurchaseRepository } from '../../../infra/repositories/PurchaseRepository';
import { BadRequestError, NotFoundError } from '../../errors';

export default class FindPurchaseHistoryController {
  async handle(req: Request, res: Response) {
    const purchaseRepository = new PurchaseRepository();
    const findPurchaseHistoryUsecase = new FindPurchaseHistory(
      purchaseRepository
    );

    const { id: userId } = req.params as { id: string };

    try {
      const purchases = await findPurchaseHistoryUsecase.execute(userId);

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
