import { NextFunction, Request, Response } from 'express';

export default function authLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const isValidEmail = regex.test(email);

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!isValidEmail || password.length <= 6) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
}
