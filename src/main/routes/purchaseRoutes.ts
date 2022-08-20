import { Router } from 'express';

import FindAllPurchasesController from '../../presentation/controllers/Purchase/FindAllPurchasesController';

const purchaseRouter = Router();

purchaseRouter.get('/purchases', new FindAllPurchasesController().handle);

export default purchaseRouter;
