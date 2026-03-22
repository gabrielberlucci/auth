import { type NextFunction, type Response, type Request } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  interface TokenPayload {
    id: number;
    email: string;
    role: string;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).send('Invalid token');
  }

  try {
    const token = authHeader!.split(' ')[1];

    const decoded = jwt.verify(
      token!,
      process.env.JWT_SECRETE as string,
    ) as TokenPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(403)
      .send({ message: 'Token invalid or expired.', error: error });
  }
};
