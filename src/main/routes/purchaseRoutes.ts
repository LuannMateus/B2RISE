import { Router } from 'express';

import FindAllPurchasesController from '../../presentation/controllers/Purchase/FindAllPurchasesController';
import FindPurchaseHistoryByUserController from '../../presentation/controllers/Purchase/FindPurchaseHistoryByUserController';
import SavePurchaseController from '../../presentation/controllers/Purchase/SavePurchaseController';

const purchaseRouter = Router();

purchaseRouter.get('/purchases', new FindAllPurchasesController().handle);

purchaseRouter.get(
  '/purchases/history/:id',
  new FindPurchaseHistoryByUserController().handle
);

purchaseRouter.post('/purchases', new SavePurchaseController().handle);

export default purchaseRouter;
