import type { NextFunction, Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcrypt';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const saltRounds = 10;

  try {
    const { email, name, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma?.user.create({
      data: {
        email: email,
        name: name,
        password: encryptedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    res.status(200).send({
      message: 'User created with success!',
      userData: user,
    });
  } catch (error) {
    res.status(500).send({
      message: 'And error has occurred',
      userError: error,
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const result = await prisma?.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!result) {
      res.status(404).send({
        message: 'User not founded',
      });

      return;
    }

    const match = await bcrypt.compare(password, result.password);

    if (match) {
      res.status(200).send({
        message: 'oi',
      });
      // login and generate JWT
    } else {
      res.status(401).send({
        message: 'user not authorized',
      });
    }
  } catch (error) {
    res.status(500).send({
      messageError: error,
    });
  }
};
