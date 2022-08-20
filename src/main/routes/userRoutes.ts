import { Router } from 'express';

import FindAllUsersController from '../../presentation/controllers/User/FindAllUsersController';

const userRouter = Router();

userRouter.get('/users', new FindAllUsersController().handle);

export default userRouter;
