import { Router } from 'express';
import { registerUser } from '../controller/auth.controller.js';
import { registerValidationRules, validate } from '../middleware/auth.validator.js';

const router = Router();

router.post('/register', registerValidationRules, registerUser);

export default router;