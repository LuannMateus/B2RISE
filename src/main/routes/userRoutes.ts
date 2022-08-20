import { Router } from 'express';

import FindAllUsersController from '../../presentation/controllers/User/FindAllUsersController';
import FindUserByIdController from '../../presentation/controllers/User/FindUserByIdController';
import SaveUserController from '../../presentation/controllers/User/SaveUserController';
import UpdateUserByIdController from '../../presentation/controllers/User/UpdateUserByIdController';

const userRouter = Router();

userRouter.get('/users/:id', new FindUserByIdController().handle);

userRouter.get('/users', new FindAllUsersController().handle);

userRouter.post('/users', new SaveUserController().handle);

userRouter.patch('/users/:id', new UpdateUserByIdController().handle);

export default userRouter;
