import { Router } from 'express';

import DeleteUserByIdController from '../../presentation/controllers/User/DeleteUserByIdController';
import FindAllUsersController from '../../presentation/controllers/User/FindAllUsersController';
import FindUserByIdController from '../../presentation/controllers/User/FindUserByIdController';
import SaveUserController from '../../presentation/controllers/User/SaveUserController';
import UpdateUserByIdController from '../../presentation/controllers/User/UpdateUserByIdController';

const userRouter = Router();

userRouter.get('/users/:id', new FindUserByIdController().handle);

userRouter.get('/users', new FindAllUsersController().handle);

userRouter.post('/users', new SaveUserController().handle);

userRouter.patch('/users/:id', new UpdateUserByIdController().handle);

userRouter.delete('/users/:id', new DeleteUserByIdController().handle);

export default userRouter;
