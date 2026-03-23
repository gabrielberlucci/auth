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

  const signedCookie = req.cookies;

  if (!signedCookie.access_token) {
    return res.status(403).send('Invalid token');
  }

  try {
    const token = signedCookie.access_token;

    console.log(token);

    const decoded = jwt.verify(
      token!,
      process.env.JWT_SECRET as string,
    ) as TokenPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(403)
      .send({ message: 'Token invalid or expired.', error: error });
  }
};
