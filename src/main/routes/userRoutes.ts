import { Router } from 'express';

import FindAllUsersController from '../../presentation/controllers/User/FindAllUsersController';
import FindUserByIdController from '../../presentation/controllers/User/FindUserByIdController';

const userRouter = Router();

userRouter.get('/users/:id', new FindUserByIdController().handle);

userRouter.get('/users', new FindAllUsersController().handle);

export default userRouter;
