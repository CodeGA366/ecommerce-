import { Request, Response } from 'express';
import Product from '../models/Product';

// Extend the Request interface to include the user property
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    name: string;
    email: string;
  };
  file?: Express.Multer.File;
}

export const createProduct = async (req: AuthenticatedRequest, res: Response): Promise<Response | void> => {
  const { name, description, price } = req.body;
  const userId = req.user?.id; // Use optional chaining to access user information
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Get the image URL

  console.log('User ID:', userId);
  console.log('Product details:', { name, description, price, imageUrl });

  if (!userId) {
    console.error('Unauthorized: No user ID found');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const product = await Product.create({
      name,
      description,
      price,
      userId,
      imageUrl: imageUrl || '',
    });

    console.log('Product created:', product);
    return res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllProducts = async (req: AuthenticatedRequest, res: Response): Promise<Response | void> => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    console.error('Get all products error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserProducts = async (req: AuthenticatedRequest, res: Response): Promise<Response | void> => {
  const userId = req.user?.id; // Use optional chaining to access user information

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const products = await Product.findAll({ where: { userId } });
    return res.status(200).json(products);
  } catch (error) {
    console.error('Get user products error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};