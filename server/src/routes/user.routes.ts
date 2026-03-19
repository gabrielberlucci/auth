import { createUser, loginUser } from '@/controllers/user.controller';
import { Router } from 'express';

export const userRouter: Router = Router();
export const postRouter: Router = Router();

userRouter.post('/api/user', createUser);
userRouter.post('/api/user/login', loginUser);
