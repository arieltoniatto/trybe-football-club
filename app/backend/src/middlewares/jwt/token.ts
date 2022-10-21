import { sign, verify, JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = 'jwt_secret';

export function generateToken(email: string) {
  return sign(email, JWT_SECRET);
}

export function validateToken(authorization: string): JwtPayload {
  return verify(authorization, JWT_SECRET) as JwtPayload;
}
