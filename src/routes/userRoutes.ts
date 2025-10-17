import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js' //TODO: create class protect

const router = Router();
router.use(protect);

router.get('/',  userController.getAllUsers);
router.get('/:id', userController.getUserId);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;