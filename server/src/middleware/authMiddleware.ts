import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Extend the Request interface to include the user property
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
      console.log('Token decoded:', decoded);

      const user = await User.findByPk(decoded.id);
      console.log('User retrieved from database:', user);

      if (user) {
        req.user = {
          id: user.getDataValue('id'),
          name: user.getDataValue('name'),
          email: user.getDataValue('email')
        };
        console.log('User authenticated:', req.user);
        next();
      } else {
        console.error('User not found');
        res.status(401).json({ message: 'Not authorized, user not found' });
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.error('No token provided');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};