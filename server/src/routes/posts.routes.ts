import { getUserPosts } from '@/controllers/posts.controller';
import { authMiddleware } from '@/middleware/user.auth.middleware';
import { Router } from 'express';

export const postRouter: Router = Router();

postRouter.get('/', authMiddleware, getUserPosts);
