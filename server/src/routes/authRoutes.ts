import { Router, Request, Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { signup, login, logout } from '../controllers/authController';
import { createProduct, getAllProducts, getUserProducts } from '../controllers/productController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', (req: Request, res: Response) => {
  signup(req, res).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

router.post('/login', (req: Request, res: Response) => {
  login(req, res).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

router.post('/logout', (req: Request, res: Response) => {
  logout(req, res).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

router.post('/products', protect, (req: AuthenticatedRequest, res: Response) => {
  createProduct(req, res).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

router.get('/products', (req: Request, res: Response) => {
  getAllProducts(req, res).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

router.get('/user/products', protect, (req: AuthenticatedRequest, res: Response) => {
  getUserProducts(req, res).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

export default router;