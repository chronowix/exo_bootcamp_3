import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js' //TODO: create class protect

const router = Router();

router.get('/', protect, userController.getAllUsers);
router.get('/:id', protect, userController.getUserId);
router.put('/:id', protect, userController.updateUser);
router.delete('/:id', protect, userController.deleteUser);

export default router;