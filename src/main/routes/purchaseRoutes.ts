import { Router } from 'express';

import FindAllPurchasesController from '../../presentation/controllers/Purchase/FindAllPurchasesController';
import FindPurchaseHistoryController from '../../presentation/controllers/Purchase/FindPurchaseHistoryController';
import SavePurchaseController from '../../presentation/controllers/Purchase/SavePurchaseController';

const purchaseRouter = Router();

purchaseRouter.get('/purchases', new FindAllPurchasesController().handle);

purchaseRouter.get(
  '/purchases/history/:id',
  new FindPurchaseHistoryController().handle
);

purchaseRouter.post('/purchases', new SavePurchaseController().handle);

export default purchaseRouter;
