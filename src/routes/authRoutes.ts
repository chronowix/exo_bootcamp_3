import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/me', protect, authController.getMe);


export default router;