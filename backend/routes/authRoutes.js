import express from 'express';
import {
    register,
    login,
    getMe,
    updateProfile,
    getUsers
} from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.get('/users', protect, admin, getUsers);

export default router;

