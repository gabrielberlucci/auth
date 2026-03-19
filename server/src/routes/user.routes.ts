import { createUser, loginUser } from '@/controllers/user.controller';
import { Router } from 'express';

export const userRouter: Router = Router();

userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
