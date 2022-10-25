import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../jwt/token';

export default async function middlewareToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(500).json({ message: 'Token missing' });
  try {
    validateToken(authorization);
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
}
