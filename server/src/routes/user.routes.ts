import { createUser, findUser } from '@/controllers/user.controller';
import { Router } from 'express';

export const userRouter: Router = Router();

userRouter.post('/api/user', createUser);
userRouter.get('/api/user/:email', findUser);
