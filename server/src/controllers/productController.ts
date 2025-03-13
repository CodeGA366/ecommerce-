import { Request, Response } from 'express';
import Product from '../models/Product';
import Sale from '../models/Sales';

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
      sold: false, // Add the sold field with a default value
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
    // Fetch products that the user has bought
    const boughtProducts = await Product.findAll({
      include: [
        {
          model: Sale,
          as: 'sales',
          where: { buyerId: userId },
          required: true,
        },
      ],
    });

    // Fetch products that the user has sold
    const soldProducts = await Product.findAll({
      where: { userId, sold: true },
    });

    return res.status(200).json({ boughtProducts, soldProducts });
  } catch (error) {
    console.error('Get user products error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const buyProduct = async (req: AuthenticatedRequest, res: Response): Promise<Response | void> => {
  const { productId } = req.params;
  const userId = req.user?.id;

  console.log('Product ID:', productId);
  console.log('User ID:', userId);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if ((product as any).userId === userId) {
      return res.status(400).json({ message: 'You cannot buy your own product' });
    }

    if ((product as any).sold) {
      return res.status(400).json({ message: 'Product already sold' });
    }

    // Log the product details
    console.log('Product details:', product);

    // Create a sale record
    const sale = await Sale.create({
      productId: (product as any).id,
      buyerId: userId,
      amount: (product as any).price,
    });

    // Log the sale details
    console.log('Sale created:', sale);

    // Mark the product as sold
    (product as any).sold = true;
    await product.save();

    return res.status(200).json(sale);
  } catch (error) {
    console.error('Buy product error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};