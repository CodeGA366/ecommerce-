import { Router, Request, Response } from 'express';
import { signup, login, logout } from '../controllers/authController';

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

export default router;