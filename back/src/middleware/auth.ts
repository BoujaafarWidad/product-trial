import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = 'secret-key';

interface JwtPayload {
  id: number;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    req.user = user as JwtPayload;
    next();
  });
}

export function isAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (req.user?.email !== 'admin@admin.com') {
    res.sendStatus(403);
    return;
  }
  next();
}

export const generateToken = (user: JwtPayload) =>
  jwt.sign(user, SECRET, { expiresIn: '2h' });
