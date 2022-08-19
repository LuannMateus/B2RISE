import { Router } from 'express';

import DeleteProductByIdController from '../../presentation/controllers/Product/DeleteProductByIdController';
import FindAllProductsController from '../../presentation/controllers/Product/FindAllProductsController';
import FindProductByIdController from '../../presentation/controllers/Product/FindProductByIdController';
import FindProductsByFilterController from '../../presentation/controllers/Product/FindProductsByFilterController';
import SaveProductController from '../../presentation/controllers/Product/SaveProductController';
import UpdateProductByIdController from '../../presentation/controllers/Product/UpdateProductByIdController';

const productRouter = Router();

productRouter.get(
  '/products/filters',
  new FindProductsByFilterController().handle
);

productRouter.get('/products/:id', new FindProductByIdController().handle);

productRouter.get('/products', new FindAllProductsController().handle);

productRouter.post('/products', new SaveProductController().handle);

productRouter.patch('/products/:id', new UpdateProductByIdController().handle);

productRouter.delete('/products/:id', new DeleteProductByIdController().handle);

export default productRouter;
