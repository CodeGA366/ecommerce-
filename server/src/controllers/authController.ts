import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import generateToken from '../utils/generateToken';

export const signup = async (req: Request, res: Response): Promise<Response | void> => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      id: user.getDataValue('id'),
      name: user.getDataValue('name'),
      email: user.getDataValue('email'),
      token: generateToken(user.getDataValue('id')),
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<Response | void> => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt:', { email, password });

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', user);

    const isMatch = await bcrypt.compare(password, user.getDataValue('password'));

    if (!isMatch) {
      console.error('Password mismatch for user:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User logged in:', user);

    return res.json({
      id: user.getDataValue('id'),
      name: user.getDataValue('name'),
      email: user.getDataValue('email'),
      token: generateToken(user.getDataValue('id')),
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    // Perform any necessary cleanup or token invalidation here
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};