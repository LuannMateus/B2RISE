import { Router } from 'express';

import FindAllUsersController from '../../presentation/controllers/User/FindAllUsersController';
import FindUserByIdController from '../../presentation/controllers/User/FindUserByIdController';
import SaveUserController from '../../presentation/controllers/User/SaveUserController';

const userRouter = Router();

userRouter.get('/users/:id', new FindUserByIdController().handle);

userRouter.get('/users', new FindAllUsersController().handle);

userRouter.post('/users', new SaveUserController().handle);

export default userRouter;
