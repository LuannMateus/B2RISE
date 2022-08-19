import { Router } from 'express';

import FindAllProductsController from '../../presentation/controllers/Product/FindAllProductsController';
import FindProductByIdController from '../../presentation/controllers/Product/FindProductByIdController';

const productRouter = Router();

productRouter.get('/products/:id', new FindProductByIdController().handle);

productRouter.get('/products', new FindAllProductsController().handle);

export default productRouter;
