import { Router } from 'express';
import { userRouter } from './user.routes';
import { postRouter } from './posts.routes';

export const routes: Router = Router();

routes.use('/api/user', userRouter);
routes.use('/api/posts', postRouter);
