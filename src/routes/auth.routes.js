import { Router } from 'express';
import { registerUser,verifyEmail,getMe } from '../controller/auth.controller.js';
import { registerValidationRules, loginValidationRules } from '../middleware/auth.validator.js';
import {authMiddleware} from '../middleware/auth.middleware.js';
import { loginUser } from '../controller/auth.controller.js';

const router = Router();

router.post('/register', registerValidationRules, registerUser);

router.post('/login', loginValidationRules, loginUser);

router.get('/get-me', authMiddleware, getMe);

router.get("/verify-email", verifyEmail);

export default router;