import type { NextFunction, Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;

    const posts = await prisma?.post.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).send({
      message: 'User posts',
      posts: posts,
    });
  } catch (error) {
    res.status(500).send({
      errorMessage: 'An error as occurred',
      error: error,
    });
  }
};
