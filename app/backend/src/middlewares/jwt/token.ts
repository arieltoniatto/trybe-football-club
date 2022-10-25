import { sign, verify, JwtPayload } from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = 'jwt_secret';

export function generateToken(email: string) {
  return sign(email, JWT_SECRET);
}

export function validateToken(authorization: string): JwtPayload {
  return verify(authorization, JWT_SECRET) as JwtPayload;
}

// export async function middlewareToken(req: Request, res: Response, next: NextFunction) {
//   const { authorization } = req.headers;
//   if (!authorization) return res.status(500).json({ message: 'Token missing' });
//   const isValid = validateToken(authorization);
//   if (!isValid) return res.status(400).json({ message: 'Invalid Token' });
//   next();
// }
