import { type NextFunction, type Response, type Request } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(403).send('Invalid token');
  }

  try {
    const token = authHeader?.split(' ')[1];
    const decoded = jwt.verify(token!, process.env.JWT_SECRET as string);
    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid or expired.' });
  }
};
